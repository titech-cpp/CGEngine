import { Matrix4 } from '../utils/Matrix';
import { Empty } from '../object/Empty';
import { GLStruct } from '../utils/GLStruct';
import { LightClass } from './LightClass';

class Light extends Empty {
  light: LightClass;

  constructor(light: LightClass) {
    super();
    this.light = light;
  }

  prepare(parentMat: Matrix4, lightList: GLStruct[]): void {
    super.prepare(parentMat, lightList);
    lightList.push(this.light.makeGLUniform(this.thisMat));
  }

  render(gl: WebGLRenderingContext, option: any): void {
    this.children.map((child) => child.render(gl, option));
  }
}

export { Light };
