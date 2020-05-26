import { Vector3, Vector4 } from './Vector';
import { Matrix4 } from './Matrixes/Matrix4';

class Quartanion {
  v: Vector3;

  w: number;

  constructor(v?: Vector3, w?: number) {
    this.v = v || new Vector3(0, 0, 0);
    this.w = w || 1;
  }

  // 設定
  set(v: Vector3, w: number): Quartanion {
    this.v = v;
    this.w = w;
    return this;
  }

  angleAxis(angle: number, _axis: Vector3): Quartanion {
    const axis: Vector3 = _axis.normalize();
    this.v = new Vector3(
      axis.x * Math.sin(angle / 2),
      axis.y * Math.sin(angle / 2),
      axis.z * Math.sin(angle / 2),
    );
    this.w = Math.cos(angle / 2);
    return this;
  }

  eulerAngle(rot: Vector3): Quartanion {
    const { x, y, z } = rot;
    const xc = Math.cos(x);
    const xs = Math.sin(x);
    const yc = Math.cos(y);
    const ys = Math.sin(y);
    const zc = Math.cos(z);
    const zs = Math.sin(z);
    this.v = new Vector3(
      xc * yc * xc + xs * ys * zs,
      xs * yc * zc - xc * ys * zs,
      xc * ys * zc + xs * yc * zs,
    );
    this.w = xc * yc * zs - xs * ys * zc;
    return this;
  }

  matrix(): Matrix4 {
    const { x, y, z } = this.v;
    const { w } = this;
    return new Matrix4([
      x ** 2 - y ** 2 - z ** 2 + w ** 2, 2 * (x * y + z * w), 2 * (x * z - y * w), 0,
      2 * (x * y - z * w), y ** 2 - x ** 2 - z ** 2 + w ** 2, 2 * (y * z + x * w), 0,
      2 * (x * z + y * w), 2 * (y * z - x * w), z ** 2 + w ** 2 - x ** 2 - y ** 2, 0,
      0, 0, 0, 1,
    ]);
  }

  // 計算
  multiply(a: Quartanion | Vector4): Quartanion | Vector4 {
    if (a instanceof Quartanion) {
      return new Quartanion(
        this.v.cross(a.v).add(this.v.multiply(a.w)).add(a.v.multiply(this.w)),
        this.w * a.w - this.v.dot(a.v),
      );
    }
    return <Vector4> this.matrix().multiply(a);
  }
}

export { Quartanion };
