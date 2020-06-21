const basicVertex: string = `
  attribute vec3 vertex;
  attribute vec3 normal;
  attribute vec2 uv;

  uniform mat4 mMatrix;
  uniform mat4 vMatrix;
  uniform mat4 pMatrix;

  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main(void)
  {
    vWorldPos = (mMatrix * vec4(vertex, 1.0)).xyz;
    vNormal = (mMatrix * vec4(normal, 1.0)).xyz;
    vUv = uv;
    gl_Position = pMatrix * vMatrix * vec4(vWorldPos, 1.0);
  }
`;

export { basicVertex };
