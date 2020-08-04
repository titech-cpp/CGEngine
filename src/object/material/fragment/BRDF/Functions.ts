const DiffuseBRDF: {[key: string]: string} = {
  Disney: `
float fresnel(in float u, in float f0, in float f90) {
  return f0 + (f90 - f0) * pow(1.0 - u, 5.0); 
}

vec3 DiffuseBRDF(in NormalizedLight normalizedLight) {
  vec3 n = vNormal;
  vec3 l = -normalizedLight.dir;
  vec3 v = -viewDir;
  vec3 h = normalize(l + v);
  float Fd90 = 0.5 + 2.0 * pow(saturate(dot(l, h)), 2.0) * roughness;
  float FL = fresnel(1.0, Fd90, saturate(dot(n, l)));
  float FV = fresnel(1.0, Fd90, saturate(dot(n, v)));
  return material.diffuse * FL * FV / PI;
}
  `,
  NormalizedDisney: `
float fresnel(in float u, in float f0, in float f90) {
  return f0 + (f90 - f0) * pow(1.0 - u, 5.0); 
}

vec3 DiffuseBRDF(in NormalizedLight normalizedLight) {
  vec3 n = vNormal;
  vec3 l = -normalizedLight.dir;
  vec3 v = -viewDir;
  vec3 h = normalize(l + v);
  float energyBias = mix(0.0, 0.5, roughness);
  float energyFactor = mix(1.0, 1.0 / 1.51, roughness);
  float Fd90 = energyBias + 2.0 * pow(saturate(dot(l, h)), 2.0) * roughness;
  float FL = fresnel(1.0, Fd90, saturate(dot(n, l)));
  float FV = fresnel(1.0, Fd90, saturate(dot(n, v)));
  return material.diffuse * FL * FV * energyFactor / PI;
}
  `,
  Lambert: `
vec3 DiffuseBRDF(in NormalizedLight normalizedLight) {
  return material.diffuse;
}
  `,
  NormalizedLambert: `
vec3 DiffuseBRDF(in NormalizedLight normalizedLight) {
  return material.diffuse / PI;
}
  `,
  OrenNayar: `
vec3 DiffuseBRDF(in NormalizedLight normalizedLight) {
  vec3 n = vNormal;
  vec3 l = -normalizedLight.dir;
  vec3 v = -viewDir;
  float r2 = roughness * roughness;
  float dotnv = saturate(dot(n, v));
  float dotnl = saturate(dot(n, l));
  float a = 1.0 - 0.5 * r2 / (r2 + 0.33);
  float b = 0.45 * r2 / (r2 + 0.09);
  float cosPhi = dot(normalize(v - dotnv * n), normalize(l - dotnl * n));
  float sinnv = sqrt(1.0 - dotnv * dotnv);
  float sinnl = sqrt(1.0 - dotnl * dotnl);
  float s = dotnv < dotnl ? sinnv : sinnl;
  float t = dotnv > dotnl ? sinnv / dotnv : sinnl / dotnl;
  return material.diffuse * (a + b * cosPhi * s * t) / PI;
}
`,
  None: `
vec3 DiffuseBRDF(in NormalizedLight normalizedLight) {
return vec3(0.0);
}
`,
};

const Distribution: {[key: string]: string} = {
  BlinnPhong: `
float D(in float a, in vec3 n, in vec3 l, in vec3 v, in vec3 h) {
  float ap = a * 50.0;
  return (ap + 2.0) / (2.0 * PI) * pow(saturate(dot(n, h)), ap);
}
`,
  Beckmann: `
float D(in float a, in vec3 n, in vec3 l, in vec3 v, in vec3 h) {
  float cosa2 = pow(dot(n, h), 2.0);
  return exp(-(1.0 - cosa2)/(cosa2 * pow(a, 2.0))) / (PI * a * a * cosa2 * cosa2 + EPSILON);
}
`,
  GGX: `
float D(in float a, in vec3 n, in vec3 l, in vec3 v, in vec3 h) {
  float dotnh = saturate(dot(n, h));
  return (a*a)/(PI * pow(dotnh * dotnh * (a * a - 1.0) + 1.0, 2.0));
}
  `,

};

const GeometricalAttenuation: {[key: string]: string} = {
  General: `
float G(in float a, in vec3 n, in vec3 l, in vec3 v, in vec3 h) {
  float dotnh = saturate(dot(n,h));
  float dotnv = saturate(dot(n, v));
  float dotvh = saturate(dot(v, h));
  float dotnl = saturate(dot(n, l));
  return min(1.0, max(max(0.0, 2.0 * dotnh * dotnv / dotvh), 2.0 * dotnh * dotnl / dotvh));
}
`,
  SmithSchlickGGX: `
float G_Schlick(in vec3 n, in vec3 v, in float k) {
  return saturate(dot(n, v)) / (saturate(dot(n, v)) * (1.0 - k) + k);
}
  
float G(in float a, in vec3 n, in vec3 l, in vec3 v, in vec3 h) {
  float k = a * a / 2.0 + EPSILON;
  return G_Schlick(n, l, k) * G_Schlick(n, v, k);
}
`,
  SmithJointGGX: `
float lambda(in float a, in vec3 n, in vec3 x) {
  return (-1.0 + sqrt(1.0 + (a * a) * (1.0 / pow(dot(x, n), 2.0)) - 1.0)) / 2.0;
}
float G(in float a, in vec3 n, in vec3 l, in vec3 v, in vec3 h) {
  return 1.0 / (1.0 + lambda(a, n, l) + lambda(a, n, v));
}
  `,
};

const Fresnel: {[key: string]: string} = {
  Schlick: `
vec3 F(in vec3 light, in vec3 n, in vec3 l, in vec3 v, in vec3 h) {
  return light + (1.0 - light) * pow(1.0 - saturate(dot(v, h)), 5.0);
}
`,
};

const SpecularBRDF: {[key: string]: string} = {
  Four: `
vec3 SpecularBRDF(in NormalizedLight normalizedLight) {
  vec3 n = vNormal;
  vec3 l = -normalizedLight.dir;
  vec3 v = -viewDir;
  vec3 h = normalize(l + v);
  float a = roughness * roughness;
  return (F(material.specular, n, l, v, h) * D(a, n, l, v, h) * G(a, n, l, v, h))/(4.0 * dot(n,l) * dot(n, v));
}
`,
  One: ` 
vec3 SpecularBRDF(in NormalizedLight normalizedLight) {
vec3 n = vNormal;
vec3 l = -normalizedLight.dir;
vec3 v = -viewDir;
vec3 h = normalize(l + v);
float a = roughness * roughness;
return (F(material.specular, n, l, v, h) * D(a, n, l, v, h) * G(a, n, l, v, h))/(dot(n,l) * dot(n, v));
}
`,
  Pi: `
vec3 SpecularBRDF(in NormalizedLight normalizedLight) {
  vec3 n = vNormal;
  vec3 l = -normalizedLight.dir;
  vec3 v = -viewDir;
  vec3 h = normalize(l + v);
  float a = roughness * roughness;
  return (F(material.specular, n, l, v, h) * D(a, n, l, v, h) * G(a, n, l, v, h))/(PI * dot(n,l) * dot(n, v));
}
`,
  Ward: `
vec3 SpecularBRDF(in NormalizedLight normalizedLight) {
  vec3 n = vNormal;
  vec3 l = -normalizedLight.dir;
  vec3 v = -viewDir;
  vec3 h = normalize(l + v);
  float ax = roughnessX * roughnessX;
  float ay = roughnessY * roughnessY;
  float c = - (pow(dot(h, vBitangent)/ax, 2.0) + pow(dot(h, vTangent)/ay, 2.0)) / pow(dot(h, n), 2.0);
  return material.specular * exp(c) / (sqrt(dot(l, n) * dot(v, n)) * 4.0 * PI * ax * ay + EPSILON);
}
`,
  KajiyaKay: `
vec3 SpecularBRDF(in NormalizedLight normalizedLight) {
  vec3 n = vNormal;
  vec3 l = -normalizedLight.dir;
  vec3 v = -viewDir;
  vec3 h = normalize(l + vTangent);
  float dotlt = dot(n, l);
  float dotlt2 = sqrt(1.0 - dotlt * dotlt);
  float dotvt = dot(v, vTangent);
  float dotvt2 = sqrt(1.0 - dotvt * dotvt);
  return pow(max(dotlt2 * dotvt2 - dotlt * dotvt, 0.0), 80.0) * material.specular;
}
`,
  None: `
vec3 SpecularBRDF(in NormalizedLight normalizedLight) {
  return vec3(0.0);
}
`,
};

export {
  DiffuseBRDF,
  Distribution,
  GeometricalAttenuation,
  Fresnel,
  SpecularBRDF,
};
