import { Vector3, Vector4 } from '../../utils/Vector';
import { Quartanion } from '../../utils/Quarternion';
import { Matrix4 } from '../../utils/Matrix';

class Transform {
  position: Vector3;

  rotation: Quartanion;

  scale: Vector3;

  constructor() {
    this.position = new Vector3(0, 0, 0);
    this.rotation = new Quartanion();
    this.scale = new Vector3(1, 1, 1);
  }

  makeMatrix(): Matrix4 {
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

    return <Matrix4>(<Matrix4>p.multiply(r)).multiply(s);
  }
}
