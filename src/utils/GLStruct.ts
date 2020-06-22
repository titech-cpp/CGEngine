import {Vector2, Vector3, Vector4 } from './Vector';
import { Matrix4 } from './Matrix';
import { UniformType, UniformSwitcher } from './UniformSwitcher';

class GLStruct {
  name: string;
  original: {[key: string]: UniformType};
  uniformLocations: {[key: string]: WebGLUniformLocation} = {};
  constructor(original: {[key: string]: UniformType}) {
    this.name = name;
    this.original = original;
  }

  createUniforms(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    name: string,
  ) {
    Object.entries(this.original).map((value) => {
      if (value[1] instanceof GLStruct) {
        (<GLStruct>value[1]).createUniforms(gl, program, `${name}.${value[0]}`);
      // } else if (value[1] instanceof GLArray) {
      //   (<GLArray>value[1]).createUniforms(gl, program, `${name}.${value[0]}`);
      } else {
        this.uniformLocations[value[0]] = <WebGLUniformLocation>gl.getUniformLocation(
          program,
          `${name}.${value[0]}`,
        );
      }
      
      return true;
    });
  }

  setUniforms(gl: WebGLRenderingContext,
    ): void {
      Object.entries(this.uniformLocations)
      .map((value) => UniformSwitcher(gl, value[1], this.original[value[0]]));
    }
}

export { GLStruct };