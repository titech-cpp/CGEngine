const BasicVertex: string = `
precision mediump float;
attribute vec3 vertex;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 tangent;
attribute vec3 bitangent;

uniform mat4 mMatrix;
uniform mat4 vMatrix;
uniform mat4 pMatrix;
uniform mat4 rMatrix;

varying vec3 vWorldPos;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vTangent;
varying vec3 vBitangent;

void main(void) {
  vWorldPos = (mMatrix * vec4(vertex, 1.0)).xyz;
  vTangent = normalize((rMatrix * vec4(tangent, 1.0)).xyz);
  vBitangent = normalize((rMatrix * vec4(bitangent, 1.0)).xyz);
  vNormal = normalize((rMatrix * vec4(normal, 1.0)).xyz);
  vUv = uv;
  gl_Position = pMatrix * vMatrix * vec4(vWorldPos, 1.0);
}
`;

export { BasicVertex };
