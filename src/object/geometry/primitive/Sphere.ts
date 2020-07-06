import { Geometry } from '../Geometry';

const Sphere = (_row?: number, _column?: number): Geometry => {
  const row: number = _row || 10;
  const column: number = _column || 10;
  const vertex: number[] = [];
  const normal: number[] = [];
  const uv: number[] = [];
  const index: number[] = [];
  for (let theta: number = 0; theta <= Math.PI + 0.001; theta += (Math.PI) / column) {
    for (let phi: number = 0; phi < Math.PI * 2; phi += (Math.PI * 2) / row) {
      vertex.push(Math.sin(theta) * Math.sin(phi));
      vertex.push(Math.cos(theta));
      vertex.push(Math.sin(theta) * Math.cos(phi));
      normal.push(Math.sin(theta) * Math.sin(phi));
      normal.push(Math.cos(theta));
      normal.push(Math.sin(theta) * Math.cos(phi));
      uv.push(phi / (Math.PI * 2));
      uv.push(theta / (Math.PI));
    }
  }

  for (let i = 0; i < column; i += 1) {
    for (let j = 0; j < row - 1; j += 1) {
      index.push(i * row + j);
      index.push((i + 1) * row + j);
      index.push(i * row + j + 1);
      index.push(i * row + j + 1);
      index.push((i + 1) * row + j);
      index.push((i + 1) * row + j + 1);
    }
    index.push(i * row + row - 1);
    index.push((i + 1) * row + row - 1);
    index.push(i * row + 0);
    index.push(i * row + 0);
    index.push((i + 1) * row + row - 1);
    index.push((i + 1) * row + 0);
  }

  return new Geometry(vertex, normal, uv, index);
};

export { Sphere };
