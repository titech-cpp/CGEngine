import { Vector2, Vector3, Vector4 } from '../../utils/Vector';
import { Matrix4 } from '../../utils/Matrix';
import { UniformSwitcher, UniformType } from '../../utils/UniformSwitcher'
import { GLStruct } from '../../utils/GLStruct';

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

class Material {
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

    gl.attachShader(program, <WebGLShader> this.vertexShader);
    gl.attachShader(program, <WebGLShader> this.fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error('Cannot link program');
    }

    this.uniform = {
      mMatrix: null,
      vMatrix: null,
      pMatrix: null,
      ...this.uniform,
    };

    Object.entries(this.uniform).map((value) => {
      if (value[1] instanceof GLStruct) {
        (<GLStruct>value[1]).createUniforms(gl, program, value[0]);
      // } else if (value[1] instanceof GLArray) {
      //   (<GLArray>value[1]).createUniform(gl, program, value[0]);
      } else {
        this.uniformLocations[value[0]] = <WebGLUniformLocation>gl.getUniformLocation(
          program,
          value[0],
        );
      }
      
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
