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

  public add(a: Vector3 | number): Vector3 {
    if (a instanceof Vector3) return new Vector3(this.x + a.x, this.y + a.y, this.z + a.z);
    return new Vector3(this.x + a, this.y + a, this.z + a);
  }

  public subtract(a: Vector3 | number): Vector3 {
    if (a instanceof Vector3) return new Vector3(this.x - a.x, this.y - a.y, this.z - a.z);
    return new Vector3(this.x - a, this.y - a, this.z - a);
  }

  public multiply(a: Vector3 | number): Vector3 {
    if (a instanceof Vector3) return new Vector3(this.x * a.x, this.y * a.y, this.z * a.z);
    return new Vector3(this.x * a, this.y * a, this.z * a);
  }

  public divide(a: Vector3 | number): Vector3 {
    if (a instanceof Vector3) return new Vector3(this.x / a.x, this.y / a.y, this.z / a.z);
    return new Vector3(this.x / a, this.y / a, this.z / a);
  }

  public normalize(): Vector3 {
    return this.divide(this.length());
  }

  public dot(a: Vector3): number {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  }

  public cross(a: Vector3): Vector3 {
    return new Vector3(
      this.y * a.z - this.z * a.y,
      this.z * a.x - this.x * a.z,
      this.x * a.y - this.y * a.x,
    );
  }

  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y, this.z]);
  }
}

export { Vector3 };
