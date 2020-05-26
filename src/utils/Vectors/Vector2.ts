class Vector2 {
  public x: number;

  public y: number;

  constructor(_x: number, _y: number) {
    this.x = _x;
    this.y = _y;
  }

  public set(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }

  public length2(): number {
    return this.x ** 2.0 + this.y ** 2.0;
  }

  public length(): number {
    return Math.sqrt(this.length2());
  }

  public distance(a: Vector2): number {
    return Math.sqrt(
      (this.x - a.x) ** 2 + (this.y - a.y) ** 2,
    );
  }

  public add(a: Vector2 | number): Vector2 {
    if (a instanceof Vector2) return new Vector2(this.x + a.x, this.y + a.y);
    return new Vector2(this.x + a, this.y + a);
  }

  public subtract(a: Vector2 | number): Vector2 {
    if (a instanceof Vector2) return new Vector2(this.x - a.x, this.y - a.y);
    return new Vector2(this.x - a, this.y - a);
  }

  public multiply(a: Vector2 | number): Vector2 {
    if (a instanceof Vector2) return new Vector2(this.x * a.x, this.y * a.y);
    return new Vector2(this.x * a, this.y * a);
  }

  public divide(a: Vector2 | number): Vector2 {
    if (a instanceof Vector2) return new Vector2(this.x / a.x, this.y / a.y);
    return new Vector2(this.x / a, this.y / a);
  }

  public normalize(): Vector2 {
    return this.divide(this.length());
  }

  public dot(a: Vector2): number {
    return this.x * a.x + this.y * a.y;
  }

  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y]);
  }
}

export { Vector2 };
