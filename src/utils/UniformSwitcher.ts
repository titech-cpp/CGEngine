import { Vector2, Vector3, Vector4 } from './Vector';
import { Matrix4 } from './Matrix';
import { GLStruct } from './GLStruct';

type UniformType = number | Vector2 | Vector3 | Vector4 | Matrix4 | GLStruct | null;

const UniformSwitcher = (
  gl: WebGLRenderingContext,
  uniLocation: WebGLUniformLocation,
  data: UniformType,
): void => {
  if (data instanceof Vector2) {
    gl.uniform2fv(uniLocation, data.getArray());
  } else if (data instanceof Vector3) {
    gl.uniform3fv(uniLocation, data.getArray());
  } else if (data instanceof Vector4) {
    gl.uniform4fv(uniLocation, data.getArray());
  } else if (data instanceof Matrix4) {
    gl.uniformMatrix4fv(uniLocation, false, data.getArray());
  } else if (data instanceof GLStruct) {
    data.setUniforms(gl);
  } else if (typeof data === 'number') {
    if (data % 1.0 === 0.0) {
      gl.uniform1i(uniLocation, data);
    } else {
      gl.uniform1f(uniLocation, data);
    }
  }
};

export { UniformSwitcher, UniformType };
