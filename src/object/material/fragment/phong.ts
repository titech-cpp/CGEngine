const phongFragment: string = `
precision mediump float;

#define saturate(x) clamp(x,0.0,1.0)
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

uniform vec4 mainColor;

uniform vec3 uCameraPos;
uniform DirectionalLight uDirectionalLight[LIGHT_MAX];
uniform int uDirectionalNum;
uniform PointLight uPointLight[LIGHT_MAX];
uniform int uPointNum;
uniform SpotLight uSpotLight[LIGHT_MAX];
uniform int uSpotNum;

varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec2 vUv;

void directionalLight(inout vec4 color, in vec3 eye, DirectionalLight light) {
  color += (saturate(dot(light.dir, vNormal)) + pow(saturate(dot(vNormal, normalize(light.dir - eye))), 50.0)) * light.color;
}

void pointLight(inout vec4 color, in vec3 eye, PointLight light) {
  float d = distance(vWorldPos, light.pos);
  if(light.distance < d) return;
  color += pow(saturate(1.0 - d / light.distance), light.decay) * saturate(dot(normalize(light.pos - vWorldPos), vNormal)) * light.color;
}

void spotLight(inout vec4 color, in vec3 eye, SpotLight light) {
  float d = distance(light.pos, vWorldPos);
  vec3 ldir = normalize(vWorldPos - light.pos);
  float c = dot(ldir, light.dir);
  if(d > light.distance || c < light.coneCos) return;
  float spot = smoothstep(light.coneCos, light.penumbraCos, c);
  float factor = pow(saturate(1.0 - d / light.distance), light.decay);

  color += light.color * spot * factor * saturate(dot(-ldir, vNormal));
}

vec4 getLightColor(in vec3 eye) {
  vec4 color;
  for (int i=0;i<LIGHT_MAX;i++) {
    if (i >= uDirectionalNum) break;
    directionalLight(color, eye, uDirectionalLight[i]);
  }
  for (int i=0;i<LIGHT_MAX;i++) {
    if (i >= uPointNum) break;
    pointLight(color, eye, uPointLight[i]);
  }
  for (int i=0;i<LIGHT_MAX;i++) {
    if (i >= uSpotNum) break;
    spotLight(color, eye, uSpotLight[i]);
  }
  return color;
}

void main(void)
{

  vec3 viewDir = normalize(vWorldPos - uCameraPos);

  vec4 result = getLightColor(viewDir);
  result = saturate(result * mainColor);
  result.a = mainColor.a;
  gl_FragColor = result;
}
`;
export { phongFragment };
