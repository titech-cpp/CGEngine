import { Vector2, Vector3, Vector4 } from '../../utils/Vector';

type UniformType = number | Vector2 | Vector3 | Vector4;

const compileShader = (
  gl: WebGLRenderingContext,
  shader: WebGLShader,
  source: string,
): void => {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(<string>gl.getShaderInfoLog(shader));
  }
};

const uniformSwitcher = (
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
  } else if (typeof data === 'number') {
    if (data % 1.0 === 0.0) {
      gl.uniform1i(uniLocation, data);
    } else {
      gl.uniform1f(uniLocation, data);
    }
  }
};

class useShader {
  private vertexSource: string;

  private fragmentSource: string;

  public uniform: {[s: string]: UniformType};

  private vertexShader: WebGLShader | null = null;

  private fragmentShader: WebGLShader | null = null;

  private uniformLocations: {[s: string]: WebGLUniformLocation} = {};

  constructor(vertex: string, fragment: string, uniform: {}) {
    this.vertexSource = vertex;
    this.fragmentSource = fragment;
    this.uniform = uniform;
  }

  initialize(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
  ) {
    this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
    this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    compileShader(gl, <WebGLShader> this.vertexShader, this.vertexSource);
    compileShader(gl, <WebGLShader> this.fragmentShader, this.fragmentSource);

    Object.entries(this.uniform).map((value) => {
      this.uniformLocations[value[0]] = <WebGLUniformLocation>gl.getUniformLocation(
        program,
        value[0],
      );
      return true;
    });
  }

  setUniforms(
    gl: WebGLRenderingContext,
  ): void {
    Object.entries(this.uniformLocations)
      .map((value) => uniformSwitcher(gl, value[1], this.uniform[value[0]]));
  }
}
