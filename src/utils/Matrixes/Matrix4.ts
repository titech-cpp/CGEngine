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

  transpose(): Matrix4 {
    const m: number[] = this.matrix;
    return new Matrix4([
      m[0], m[4], m[8], m[12],
      m[1], m[5], m[9], m[13],
      m[2], m[6], m[10], m[14],
      m[3], m[7], m[11], m[15],
    ]);
  }

  inverse(): Matrix4 {
    const mat: number[] = this.matrix;
    const a = mat[0]; const b = mat[1]; const c = mat[2]; const d = mat[3];
    const e = mat[4]; const f = mat[5]; const g = mat[6]; const h = mat[7];
    const i = mat[8]; const j = mat[9]; const k = mat[10]; const l = mat[11];
    const m = mat[12]; const n = mat[13]; const o = mat[14]; const p = mat[15];
    const q = a * f - b * e; const r = a * g - c * e;
    const s = a * h - d * e; const t = b * g - c * f;
    const u = b * h - d * f; const v = c * h - d * g;
    const w = i * n - j * m; const x = i * o - k * m;
    const y = i * p - l * m; const z = j * o - k * n;
    const A = j * p - l * n; const B = k * p - l * o;
    let ivd = (q * B - r * A + s * z + t * y - u * x + v * w);
    if (ivd === 0) throw new Error('det A == 0');
    ivd = 1 / ivd;

    const dest: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dest[0] = (f * B - g * A + h * z) * ivd;
    dest[1] = (-b * B + c * A - d * z) * ivd;
    dest[2] = (n * v - o * u + p * t) * ivd;
    dest[3] = (-j * v + k * u - l * t) * ivd;
    dest[4] = (-e * B + g * y - h * x) * ivd;
    dest[5] = (a * B - c * y + d * x) * ivd;
    dest[6] = (-m * v + o * s - p * r) * ivd;
    dest[7] = (i * v - k * s + l * r) * ivd;
    dest[8] = (e * A - f * y + h * w) * ivd;
    dest[9] = (-a * A + b * y - d * w) * ivd;
    dest[10] = (m * u - n * s + p * q) * ivd;
    dest[11] = (-i * u + j * s - l * q) * ivd;
    dest[12] = (-e * z + f * x - g * w) * ivd;
    dest[13] = (a * z - b * x + c * w) * ivd;
    dest[14] = (-m * t + n * r - o * q) * ivd;
    dest[15] = (i * t - j * r + k * q) * ivd;
    return new Matrix4(dest);
  }
}

export { Matrix4 };
