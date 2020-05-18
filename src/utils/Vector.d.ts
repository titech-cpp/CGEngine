export class Vecotr2
{
  constructor(x: number, y:number);
  x: number;
  y: number;
  length(): number;
  distance(a: Vecotr2, b: Vecotr2): number;
}

export class Vecotr3
{
  constructor(x: number, y:number, z:number);
  x: number;
  y: number;
  z: number;
  length(): number;
  distance(a: Vecotr3, b: Vecotr3): number;
}

export class Vecotr4
{
  constructor(x: number, y:number, z: number, w:number);
  x: number;
  y: number;
  z: number;
  w: number;
  length(): number;
  distance(a: Vecotr4, b: Vecotr4): number;
}