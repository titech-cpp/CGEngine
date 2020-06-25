import { Transform } from './transform/Transform';
import { Matrix4 } from '../utils/Matrix';
import { GLStruct } from '../utils/GLStruct';

class Empty {
  transform: Transform = new Transform();

  thisMat: Matrix4 = new Matrix4();

  children: Empty[];

  constructor() {
    this.children = [];
  }

  initialize(
    gl: WebGLRenderingContext,
  ): void {
    this.children.map((child) => child.initialize(gl));
  }

  prepare(parentMat: Matrix4, lightList: GLStruct[]): void {
    this.thisMat = <Matrix4>parentMat.multiply(
      this.transform.getMatrix(),
    );
    this.children.map((child) => child.prepare(this.thisMat, lightList));
  }

  render(gl: WebGLRenderingContext, option: any): void {
    this.children.map((child) => child.render(gl, option));
  }
}

export { Empty };
