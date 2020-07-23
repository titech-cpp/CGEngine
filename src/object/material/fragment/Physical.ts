const physical = `
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
  vec4 color;
}

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
Material {
  vec3 diffuse;
  vec3 specular;
  float roughness;
}

Material material;

vec3 viewDir;

float D(in vec3 n, in vec3 h, in float a) {
  return (a*a)/(PI * pow(pow(dot(n,h), 2.0)*(a*a-1)+1, 2.0));
}

float G_Schlick(in vec3 n, in vec3 v, in float k) {
  return dot(n, v) / (dot(n, v)(1 - k) + k);
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

vec3 ReflectLight(in NormalizedLight normalizedLight) {
  vec3 diffuse = material.diffuse / PI;
  vec3 specular = BRDF(normalizedLight);
  result += (diffuse + specular) * normalizedLight.color.xyz * normalizedLight.color.a;
}

void LightCalc() {
  ^[@]
}

void globalValueSet() {
  material.diffuse = mix(albedo.xyz, vec3(0.0), metallic);
  material.specular = mix(vec3(0.04), albedo.xyz, metallic);
  material.roughness = roughness;

  viewDir = normalize(vWorldPos - uCameraPos);
}

vec4 

void main(void)
{
  globalValueSet();
  gl_FragColor = result;
}
`;
