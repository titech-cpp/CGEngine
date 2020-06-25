import { UniformType, UniformSwitcher } from './UniformSwitcher';
import { GLStruct } from './GLStruct';

class GLArray {
  original: UniformType[];

  uniformLocations: (WebGLUniformLocation | null)[] = [];

  constructor(original: UniformType[]) {
    this.original = original;
  }

  createUniforms(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    name: string,
  ) {
    let o;
    for (let i: number = 0; i < this.original.length; i += 1) {
      o = this.original[i];
      if (o instanceof GLStruct || o instanceof GLArray) {
        this.uniformLocations.push(null);
        o.createUniforms(gl, program, `${name}[${i}]`);
      } else {
        this.uniformLocations.push(<WebGLUniformLocation>gl.getUniformLocation(
          program,
          `${name}[${i}]`,
        ));
      }
    }
  }

  setUniforms(gl: WebGLRenderingContext): void {
    for (let i: number = 0; i < this.original.length; i += 1) {
      UniformSwitcher(gl, this.uniformLocations[i], this.original[i]);
    }
  }
}

export { GLArray };
