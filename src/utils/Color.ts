
class Color {
  public r: number;

  public g: number;

  public b: number;

  public a: number;

  constructor(_r: number, _g: number, _b: number, _a: number | undefined) {
    this.r = _r;
    this.g = _g;
    this.b = _b;
    this.a = <number>(_a || 1.0);
  }
}

export { Color };
