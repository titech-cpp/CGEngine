const phong = `
precision mediump float;

uniform vec4 mainColor;
uniform vec3 cameraPos;

struct GeneralLight {
  vec3 direction;
  vec4 color;
}

/*
 * type
 * 0: directional
 * 1: point
 * 2: spot
 * 3: area
 */
struct Light {
  vec3 pos;
  int type;
  float power;
  float coneArg;
}

uniform Light lights[10];
uniform int lightNum;

GeneralLight generalLights[10];

void DirectionalLightNormalize(in Light light, out GeneralLight generalLight) {
  generalLight.direction = -normalize(light.pos);
  generalLight.color = light.color;
}

void lightNormalize() {
  for (int i = 0; i < lightNum; i += 1) {
    if(lights[0].type == 0) {
      DirectionalLightNormalize(lights[i], generalLights[i])
    }
  }
}

void main(void)
{
  gl_FragColor = mainColor;
}
`;