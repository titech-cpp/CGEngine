import { Vector4 } from '../Vector';

class Matrix4 {
  matrix: number[] = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ];

  constructor(numArray?: number[]) {
    if (numArray) this.set(numArray);
  }

  // 生成
  eye(): Matrix4 {
    this.matrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
    return this;
  }

  set(numArray: number[]): Matrix4 {
    this.matrix = numArray;
    return this;
  }

  empty(): Matrix4 {
    this.matrix = [
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
    ];
    return this;
  }

  fill(a: number): Matrix4 {
    this.matrix = [
      a, a, a, a,
      a, a, a, a,
      a, a, a, a,
      a, a, a, a,
    ];
    return this;
  }

  // 計算
  add(addMat: Matrix4): Matrix4 {
    const m: number[] = this.matrix;
    const n: number[] = addMat.matrix;
    return new Matrix4([
      m[0] + n[0], m[1] + n[1], m[2] + n[2], m[3] + n[3],
      m[4] + n[4], m[5] + n[5], m[6] + n[6], m[7] + n[7],
      m[8] + n[8], m[9] + n[9], m[10] + n[10], m[11] + n[11],
      m[12] + n[12], m[13] + n[13], m[14] + n[14], m[15] + n[15],
    ]);
  }

  subtract(subMat: Matrix4): Matrix4 {
    const m: number[] = this.matrix;
    const n: number[] = subMat.matrix;
    return new Matrix4([
      m[0] - n[0], m[1] - n[1], m[2] - n[2], m[3] - n[3],
      m[4] - n[4], m[5] - n[5], m[6] - n[6], m[7] - n[7],
      m[8] - n[8], m[9] - n[9], m[10] - n[10], m[11] - n[11],
      m[12] - n[12], m[13] - n[13], m[14] - n[14], m[15] - n[15],
    ]);
  }

  multiply(mul: number | Matrix4 | Vector4): Matrix4 | Vector4 {
    const m: number[] = this.matrix;
    if (mul instanceof Matrix4) {
      const n: number[] = mul.matrix;
      return new Matrix4([
        m[0] * n[0] + m[4] * n[1] + m[8] * n[2] + m[12] * n[3],
        m[1] * n[0] + m[5] * n[1] + m[9] * n[2] + m[13] * n[3],
        m[2] * n[0] + m[6] * n[1] + m[10] * n[2] + m[14] * n[3],
        m[3] * n[0] + m[7] * n[1] + m[11] * n[2] + m[15] * n[3],
        m[0] * n[4] + m[4] * n[5] + m[8] * n[6] + m[12] * n[7],
        m[1] * n[4] + m[5] * n[5] + m[9] * n[6] + m[13] * n[7],
        m[2] * n[4] + m[6] * n[5] + m[10] * n[6] + m[14] * n[7],
        m[3] * n[4] + m[7] * n[5] + m[11] * n[6] + m[15] * n[7],
        m[0] * n[8] + m[4] * n[9] + m[8] * n[10] + m[12] * n[11],
        m[1] * n[8] + m[5] * n[9] + m[9] * n[10] + m[13] * n[11],
        m[2] * n[8] + m[6] * n[9] + m[10] * n[10] + m[14] * n[11],
        m[3] * n[8] + m[7] * n[9] + m[11] * n[10] + m[15] * n[11],
        m[0] * n[12] + m[4] * n[13] + m[8] * n[14] + m[12] * n[15],
        m[1] * n[12] + m[5] * n[13] + m[9] * n[14] + m[13] * n[15],
        m[2] * n[12] + m[6] * n[13] + m[10] * n[14] + m[14] * n[15],
        m[3] * n[12] + m[7] * n[13] + m[11] * n[14] + m[15] * n[15],
      ]);
    }
    if (mul instanceof Vector4) {
      return new Vector4(
        m[0] * mul.x + m[4] * mul.y + m[8] * mul.z + m[12] * mul.w,
        m[1] * mul.x + m[5] * mul.y + m[9] * mul.z + m[13] * mul.w,
        m[2] * mul.x + m[6] * mul.y + m[10] * mul.z + m[14] * mul.w,
        m[3] * mul.x + m[7] * mul.y + m[11] * mul.z + m[15] * mul.w,
      );
    }
    return new Matrix4([
      m[0] * mul, m[1] * mul, m[2] * mul, m[3] * mul,
      m[4] * mul, m[5] * mul, m[6] * mul, m[7] * mul,
      m[8] * mul, m[9] * mul, m[10] * mul, m[11] * mul,
      m[12] * mul, m[13] * mul, m[14] * mul, m[15] * mul,
    ]);
  }
}

export { Matrix4 };
