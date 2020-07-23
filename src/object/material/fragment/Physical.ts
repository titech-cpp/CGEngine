const PhysicalFragment: string = `
precision mediump float;

#define saturate(x) clamp(x,0.0,1.0)
#define PI 3.14159265
#define EPSILON 0.00001
#define LIGHT_MAX 10

struct DirectionalLight {
  vec3 dir;
  vec4 color;
};

struct PointLight {
  vec3 pos;
  vec4 color;
  float decay;
  float distance;
};

struct SpotLight {
  vec3 pos;
  vec3 dir;
  vec4 color;
  float coneCos;
  float penumbraCos;
  float distance;
  float decay;
};

struct AmbientLight {
  vec4 color;
};

struct NormalizedLight {
  vec3 dir;
  vec3 color;
};

// Rendererで追加されるやつ
uniform vec3 uCameraPos;
uniform DirectionalLight uDirectionalLight[LIGHT_MAX];
uniform int uDirectionalNum;
uniform PointLight uPointLight[LIGHT_MAX];
uniform int uPointNum;
uniform SpotLight uSpotLight[LIGHT_MAX];
uniform int uSpotNum;
uniform AmbientLight uAmbientLight[LIGHT_MAX];
uniform int uAmbientNum;

// vertexからの
varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec2 vUv;

// PBRパラメーター
uniform vec4 albedo;
uniform float roughness;
uniform float metallic;

// グローバル変数
struct Material {
  vec3 diffuse;
  vec3 specular;
  float roughness;
};

Material material;

vec3 viewDir;

float D(in vec3 n, in vec3 h, in float a) {
  return (a*a)/(PI * pow(pow(dot(n,h), 2.0) * (a*a - 1.0) + 1.0, 2.0));
}

float G_Schlick(in vec3 n, in vec3 v, in float k) {
  return dot(n, v) / (dot(n, v) * (1.0 - k) + k);
}

float G(in vec3 n, in vec3 l, in vec3 v, in float a) {
  float k = a / 2.0;
  return G_Schlick(n, l, k) * G_Schlick(n, v, k);
}

vec3 F(in vec3 light, in vec3 v, in vec3 h) {
  return light + (1.0 - light) * pow(1.0 - dot(v, h), 5.0);
}

vec3 BRDF(in NormalizedLight normalizedLight) {
  vec3 n = vNormal;
  vec3 l = -normalizedLight.dir;
  vec3 v = -viewDir;
  vec3 h = normalize(l + v);
  float a = pow(material.roughness, 2.0);
  return (D(n, h, a) * G(n, l, v, a) * F(material.specular, v, h))/(4.0 * dot(n, l) * dot(n, v) + EPSILON);
}

void ReflectLight(inout vec3 result, in NormalizedLight normalizedLight) {
  vec3 diffuse = material.diffuse / PI;
  vec3 specular = BRDF(normalizedLight);
  vec3 irradiance = saturate(dot(vNormal, normalizedLight.dir)) * normalizedLight.color * PI;

  result += (diffuse + specular) * irradiance;
}

bool directionalLight(DirectionalLight light, inout NormalizedLight normalizedLight) {
  normalizedLight.color = light.color.xyz * light.color.a;
  normalizedLight.dir = light.dir;
  return true;
}

bool pointLight(PointLight light, NormalizedLight normalizedLight) {
  float d = distance(vWorldPos, light.pos);
  if(light.distance < d) return false;
  normalizedLight.color = pow(saturate(1.0 - d / light.distance), light.decay) * light.color.xyz * light.color.a;
  normalizedLight.dir = normalize(vWorldPos - light.pos);
  return true;
}

bool spotLight(SpotLight light, NormalizedLight normalizedLight) {
  float d = distance(light.pos, vWorldPos);
  vec3 ldir = normalize(vWorldPos - light.pos);
  float c = dot(ldir, light.dir);
  if(d > light.distance || c < light.coneCos) return false;
  float spot = smoothstep(light.coneCos, light.penumbraCos, c);
  float factor = pow(saturate(1.0 - d / light.distance), light.decay);
  
  normalizedLight.color = light.color.xyz * light.color.a * spot * factor;
  normalizedLight.dir = normalize(vWorldPos - light.pos);
  return true;
}

vec3 lightCalc() {
  vec3 result = vec3(0.0);
  NormalizedLight normalizedLight;

  for(int i=0;i<LIGHT_MAX;i++) {
    if(i >= uDirectionalNum) break;
    directionalLight(uDirectionalLight[i], normalizedLight);
    ReflectLight(result, normalizedLight);
  }
  for(int i=0;i<LIGHT_MAX;i++) {
    if(i >= uPointNum) break;
    if(pointLight(uPointLight[i], normalizedLight)) ReflectLight(result, normalizedLight);
  }
  for(int i=0;i<LIGHT_MAX;i++) {
    if(i >= uSpotNum) break;
    if(spotLight(uSpotLight[i], normalizedLight)) ReflectLight(result, normalizedLight);
  }
  for(int i=0;i<LIGHT_MAX;i++) {
    if(i >= uAmbientNum) break;
    result += uAmbientLight[i].color.xyz * uAmbientLight[i].color.a;
  }
  return result;
}

void globalValueSet() {
  material.diffuse = mix(albedo.xyz, vec3(0.0), metallic);
  material.specular = mix(vec3(0.04), albedo.xyz, metallic);
  material.roughness = roughness;

  viewDir = normalize(vWorldPos - uCameraPos);
}

void main(void){
  globalValueSet();
  vec3 result = lightCalc();
  gl_FragColor = vec4(result, albedo.a);
}
`;

export { PhysicalFragment };
