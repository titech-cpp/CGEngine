import { UniformType, UniformSwitcher } from './UniformSwitcher';
import { GLArray } from './GLArray';

class GLStruct {
  original: {[key: string]: UniformType};

  uniformLocations: {[key: string]: WebGLUniformLocation | null} = {};

  constructor(original: {[key: string]: UniformType}) {
    this.original = original;
  }

  createUniforms(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    name: string,
  ) {
    Object.entries(this.original).map((value) => {
      if (value[1] instanceof GLStruct || value[1] instanceof GLArray) {
        this.uniformLocations[value[0]] = null;
        value[1].createUniforms(gl, program, `${name}.${value[0]}`);
      } else {
        this.uniformLocations[value[0]] = <WebGLUniformLocation>gl.getUniformLocation(
          program,
          `${name}.${value[0]}`,
        );
      }

      return true;
    });
  }

  setUniforms(gl: WebGLRenderingContext): void {
    Object.entries(this.original)
      .map((value) => UniformSwitcher(gl, this.uniformLocations[value[0]], value[1]));
  }
}

export { GLStruct };
