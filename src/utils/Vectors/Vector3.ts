class Vector3 {
  public x: number;

  public y: number;

  public z: number;

  constructor(_x: number, _y: number, _z: number) {
    this.x = _x;
    this.y = _y;
    this.z = _z;
  }

  public length2(): number {
    return this.x ** 2.0 + this.y ** 2.0 + this.z ** 2.0;
  }

  public length(): number {
    return Math.sqrt(this.length2());
  }

  public static distance(a: Vector3, b: Vector3): number {
    return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z).length();
  }

  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y, this.z]);
  }
}

export { Vector3 };
