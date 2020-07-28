import { UniformSwitcher, UniformType } from '../../utils/UniformSwitcher';

const compileShader = (
  gl: WebGLRenderingContext,
  shader: WebGLShader,
  source: string,
): void => {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(source);
    throw new Error(<string>gl.getShaderInfoLog(shader));
  }
};

class Material {
  private vertexSource: string;

  private fragmentSource: string;

  public uniform: {[s: string]: UniformType};

  private vertexShader: WebGLShader | null = null;

  private fragmentShader: WebGLShader | null = null;

  private uniformLocations: {[s: string]: WebGLUniformLocation | null} = {};

  constructor(vertex: string, fragment: string, uniform: {}) {
    this.vertexSource = vertex;
    this.fragmentSource = fragment;
    this.uniform = uniform;
  }

  initialize(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    defaultUniform: any,
  ) {
    this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
    this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    compileShader(gl, <WebGLShader> this.vertexShader, this.vertexSource);
    compileShader(gl, <WebGLShader> this.fragmentShader, this.fragmentSource);

    gl.attachShader(program, <WebGLShader> this.vertexShader);
    gl.attachShader(program, <WebGLShader> this.fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(<string>gl.getProgramInfoLog(program));
    }

    this.uniform = {
      ...this.uniform,
      ...defaultUniform,
    };

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
      .map((value) => UniformSwitcher(gl, value[1], this.uniform[value[0]]));
  }
}

export { Material };
