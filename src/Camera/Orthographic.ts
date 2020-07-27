import { Transform } from '../object/transform/Transform';
import { Matrix4 } from '../utils/Matrix';
import { Vector3 } from '../utils/Vector';

class OrthographicCamera {
  transform: Transform;

  height: number;

  aspect: number;

  near: number;

  far: number;

  viewMatrix: Matrix4 = new Matrix4();

  projectionMatrix: Matrix4 = new Matrix4();

  constructor(height: number, aspect: number, near: number, far: number) {
    this.transform = new Transform();
    this.height = height;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
    this.updateProjectionMatrix();
  }

  updateProjectionMatrix(): void {
    const scaleX: number = 2.0 / this.height / this.aspect;
    const scaleY: number = 2.0 / this.height;
    const scaleZ: number = 2.0 / (this.far - this.near);
    const transZ: number = (this.far + this.near) / (this.far - this.near);

    this.projectionMatrix.set([
      scaleX, 0, 0, 0,
      0, scaleY, 0, 0,
      0, 0, -scaleZ, 0,
      0, 0, -transZ, 1,
    ]);
  }

  getMatrix(): {vMatrix: Matrix4, pMatrix: Matrix4, uCameraPos: Vector3} {
    this.viewMatrix = this.transform.needUpdate()
      ? this.transform.getMatrix().inverse()
      : this.viewMatrix;
    return {
      vMatrix: this.viewMatrix,
      pMatrix: this.projectionMatrix,
      uCameraPos: this.transform.position,
    };
  }
}

export { OrthographicCamera };
