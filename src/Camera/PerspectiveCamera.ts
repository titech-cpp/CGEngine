import { Transform } from '../object/transform/Transform';
import { Matrix4 } from '../utils/Matrix';

class PerspectiveCamera {
  transform: Transform;

  angle: number;

  aspect: number;

  near: number;

  far: number;

  viewMatrix: Matrix4 = new Matrix4();

  projectionMatrix: Matrix4 = new Matrix4();

  constructor(angle: number, aspect: number, near: number, far: number) {
    this.transform = new Transform();
    this.angle = angle;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
    this.updateProjectionMatrix();
  }

  updateProjectionMatrix(): void {
    const scaleX: number = 1 / Math.tan(this.angle / 2) / this.aspect;
    const scaleY: number = 1 / Math.tan(this.angle / 2);
    const scaleZ: number = (this.near + this.far) / (this.near - this.far);
    const transZ: number = (2 * this.near * this.far) / (this.near - this.far);

    this.projectionMatrix.set([
      scaleX, 0, 0, 0,
      0, scaleY, 0, 0,
      0, 0, scaleZ, -1,
      0, 0, transZ, 0,
    ]);
  }

  getMatrix(): Matrix4 {
    this.viewMatrix = this.transform.needUpdate()
      ? this.transform.getMatrix().inverse()
      : this.viewMatrix;
    return <Matrix4> this.projectionMatrix.multiply(this.viewMatrix);
  }
}

export { PerspectiveCamera };
