
class Vector2
{
  public x: number;
  public y: number;

  constructor(_x: number, _y: number)
  {
    this.x = _x;
    this.y = _y;
  }

  public length2(): number
  {
    return Math.pow(this.x, 2.0)+Math.pow(this.y, 2.0);
  }

  public length(): number
  {
    return Math.sqrt(this.length2())
  }

  public static distance(a: Vector2, b: Vector2): number
  {
    return new Vector2(a.x - b.x, a.y - b.y).length();
  }

  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y]);
  }
}

class Vector3
{
  public x: number;
  public y: number;
  public z: number;

  constructor(_x: number, _y: number, _z: number)
  {
    this.x = _x;
    this.y = _y;
    this.z = _z;
  }

  public length2(): number
  {
    return Math.pow(this.x, 2.0) + Math.pow(this.y, 2.0) + Math.pow(this.z, 2.0);
  }

  public length(): number
  {
    return Math.sqrt(this.length2())
  }

  public static distance(a: Vector3, b: Vector3): number
  {
    return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z).length();
  }

  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y, this.z]);
  }
}

class Vector4
{
  public x: number;
  public y: number;
  public z: number;
  public w: number;

  constructor(_x: number, _y: number, _z: number, _w: number)
  {
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.w = _w;
  }

  public length2(): number
  {
    return Math.pow(this.x, 2.0) + Math.pow(this.y, 2.0) + Math.pow(this.z, 2.0) + Math.pow(this.w, 2.0);
  }

  public length(): number
  {
    return Math.sqrt(this.length2())
  }

  public static distance(a: Vector4, b: Vector4): number
  {
    return new Vector4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w).length();
  }
  
  public getArray(): Float32Array {
    return new Float32Array([this.x, this.y, this.z, this.w]);
  }
}



export { Vector2, Vector3, Vector4 };