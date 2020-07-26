import { Vector2, Vector3, Vector4 } from './Vector';
import { Matrix4 } from './Matrix';
import { Color } from './Color';
import { Integer } from './Integer';

type UniformType = (
  number | Vector2 | Vector3 | Vector4 | Color | Matrix4 | Integer | null
);

const isUniformInstance = (a: any) => (
  (typeof a === 'number')
    || (a instanceof Vector2)
    || (a instanceof Vector3)
    || (a instanceof Vector4)
    || (a instanceof Color)
    || (a instanceof Matrix4)
    || (a instanceof Integer)
);

const UniformSwitcher = (
  gl: WebGLRenderingContext,
  uniLocation: WebGLUniformLocation | null,
  data: UniformType,
): void => {
  if (data instanceof Vector2) {
    gl.uniform2fv(uniLocation, data.getArray());
  } else if (data instanceof Vector3) {
    gl.uniform3fv(uniLocation, data.getArray());
  } else if (data instanceof Vector4) {
    gl.uniform4fv(uniLocation, data.getArray());
  } else if (data instanceof Color) {
    gl.uniform4fv(uniLocation, data.getArray());
  } else if (data instanceof Matrix4) {
    gl.uniformMatrix4fv(uniLocation, false, data.getArray());
  } else if (data instanceof Integer) {
    if (data.value instanceof Vector2) {
      gl.uniform2iv(uniLocation, data.value.getArray());
    } else if (data.value instanceof Vector3) {
      gl.uniform3iv(uniLocation, data.value.getArray());
    } else if (data.value instanceof Vector4) {
      gl.uniform4iv(uniLocation, data.value.getArray());
    } else if (typeof data.value === 'number') {
      gl.uniform1i(uniLocation, data.value);
    }
  } else if (typeof data === 'number') {
    gl.uniform1f(uniLocation, data);
  }
};

export { UniformSwitcher, UniformType, isUniformInstance };
