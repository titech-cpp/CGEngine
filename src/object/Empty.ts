import { Transform } from './transform/Transform';
import { Matrix4 } from '../utils/Matrix';
import { LightsUniform } from '../light/Primitives';

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

  prepare(parentMat: Matrix4, lightList: LightsUniform): void {
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
