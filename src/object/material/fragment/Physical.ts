import { Primitives } from './BRDF/Primitives';

const PhysicalFragmentBase: {before: string, after: string} = {
  before: `
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
};

Material material;

vec3 viewDir;

bool directionalLight(in DirectionalLight light, inout NormalizedLight normalizedLight) {
  normalizedLight.color = light.color.xyz * light.color.a;
  normalizedLight.dir = light.dir;
  return true;
}

bool pointLight(in PointLight light, inout NormalizedLight normalizedLight) {
  float d = distance(vWorldPos, light.pos);
  if(light.distance < d) return false;
  normalizedLight.color = pow(saturate(1.0 - d / light.distance), light.decay) * light.color.xyz * light.color.a;
  normalizedLight.dir = normalize(vWorldPos - light.pos);
  return true;
}

bool spotLight(in SpotLight light, inout NormalizedLight normalizedLight) {
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
`,
  after: `
void ReflectLight(inout vec3 result, in NormalizedLight normalizedLight) {
  vec3 diffuse = Diffuse(normalizedLight);
  vec3 specular = BRDF(normalizedLight);
  vec3 irradiance = saturate(dot(vNormal, -normalizedLight.dir)) * normalizedLight.color * PI;

  result += (diffuse + specular) * irradiance;
}

vec3 lightCalc() {
  vec3 result = vec3(0.0);
  NormalizedLight normalizedLight;
  normalizedLight.dir = vec3(1.0,0.0,0.0);
  normalizedLight.color = vec3(0.0,0.0,0.0);

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
  for(int i=0;i<LIGHT_sMAX;i++) {
    if(i >= uAmbientNum) break;
    result += uAmbientLight[i].color.xyz * uAmbientLight[i].color.a;
  }
  return result;
}

void globalValueSet() {
  material.diffuse = mix(albedo.xyz, vec3(0.0), metallic);
  material.specular = mix(vec3(0.04), albedo.xyz, metallic);

  viewDir = normalize(vWorldPos - uCameraPos);
}

void main(void){
  globalValueSet();
  vec3 result = lightCalc();
  gl_FragColor = vec4(result, albedo.a);
}
  `,
};

const PhysicalFragment = (_brdf?: string) => {
  const brdf: string = _brdf || Primitives.Standard;
  return PhysicalFragmentBase.before + brdf + PhysicalFragmentBase.after;
};

export { PhysicalFragment };
