const phongFragment: string = `
precision mediump float;

#define saturate(x) clamp(x,0.0,1.0)
#define LIGHT_MAX 10

struct DirectionalLight {
  vec3 dir;
  vec4 color;
};

uniform vec4 mainColor;

uniform vec3 uCameraPos;
uniform DirectionalLight uDirectionalLight[LIGHT_MAX];
uniform int uDirectionalNum;

varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec2 vUv;


void directionalLight(inout vec4 color, in vec3 eye) {
  for (int i=0;i<LIGHT_MAX;i++) {
    if (i >= uDirectionalNum) break;
    color += (saturate(dot(uDirectionalLight[i].dir, vNormal)) + pow(saturate(dot(vNormal, normalize(uDirectionalLight[i].dir - eye))), 50.0)) * uDirectionalLight[i].color;
  }
}

void main(void)
{

  vec3 viewDir = normalize(vWorldPos - uCameraPos);

  vec4 result = vec4(0.0, 0.0, 0.0, 0.0);
  directionalLight(result, viewDir);
  result = saturate(result * mainColor);
  result.a = mainColor.a;
  gl_FragColor = result;
}
`;
export { phongFragment };
