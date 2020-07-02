import { Vector2, Vector3, Vector4 } from './Vector';
import { Matrix4 } from './Matrix';
import { Color } from './Color';

type UniformType = (
  number | Vector2 | Vector3 | Vector4 | Color | Matrix4 | null
);

const isUniformInstance = (a: any) => (
  (typeof a === 'number')
    || (a instanceof Vector2)
    || (a instanceof Vector3)
    || (a instanceof Vector4)
    || (a instanceof Color)
    || (a instanceof Matrix4)
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
  } else if (typeof data === 'number') {
    if (data % 1.0 === 0.0) {
      gl.uniform1i(uniLocation, data);
    } else {
      gl.uniform1f(uniLocation, data);
    }
  }
};

export { UniformSwitcher, UniformType, isUniformInstance };
