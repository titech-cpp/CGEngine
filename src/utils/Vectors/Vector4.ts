class Vector4 {
  public x: number;

  public y: number;

  public z: number;

  public w: number;

  constructor(_x: number, _y: number, _z: number, _w: number) {
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.w = _w;
  }

  public length2(): number {
    return this.x ** 2.0 + this.y ** 2.0 + this.z ** 2.0 + this.w ** 2.0;
  }

  public length(): number {
    return Math.sqrt(this.length2());
  }

  public static distance(a: Vector4, b: Vector4): number {
    return new Vector4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w).length();
  }

  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y, this.z, this.w]);
  }
}

export { Vector4 };
