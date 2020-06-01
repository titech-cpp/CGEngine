import { Vector3 } from '../../utils/Vector';
import { Quartanion } from '../../utils/Quarternion';
import { Matrix4 } from '../../utils/Matrix';

class Transform {
  position: Vector3;

  prevPos: Vector3;

  rotation: Quartanion;

  prevRot: Quartanion;

  scale: Vector3;

  prevSca: Vector3;

  matrix: Matrix4;

  constructor() {
    this.position = new Vector3(0, 0, 0);
    this.prevPos = new Vector3(0, 0, 0);
    this.rotation = new Quartanion();
    this.prevRot = new Quartanion();
    this.scale = new Vector3(1, 1, 1);
    this.prevSca = new Vector3(1, 1, 1);
    this.matrix = new Matrix4();
  }

  update(): Matrix4 {
    if (
      this.position.equal(this.prevPos)
      && this.rotation.equal(this.prevRot)
      && this.scale.equal(this.prevSca)
    ) return this.matrix;
    const p = new Matrix4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      this.position.x, this.position.y, this.position.z, 1,
    ]);
    const s = new Matrix4([
      this.scale.x, 0, 0, 0,
      0, this.scale.y, 0, 0,
      0, 0, this.scale.z, 0,
      0, 0, 0, 1,
    ]);
    const r = this.rotation.matrix();

    this.matrix = <Matrix4>(<Matrix4>p.multiply(r)).multiply(s);
    this.prevPos = this.position.copy();
    this.prevRot = this.rotation.copy();
    this.prevSca = this.scale.copy();
    return this.matrix;
  }
}

export { Transform };
