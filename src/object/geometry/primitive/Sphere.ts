import { Geometry } from '../Geometry';

const Sphere = (_row?: number, _column?: number): Geometry => {
  const row: number = _row || 10;
  const column: number = _column || 10;
  const vertex: number[] = [];
  const normal: number[] = [];
  const uv: number[] = [];
  const index: number[] = [];
  for (let theta: number = 0; theta < Math.PI + 0.001; theta += (Math.PI) / column) {
    for (let phi: number = 0; phi < Math.PI * 2 + 0.001; phi += (Math.PI * 2) / row) {
      vertex.push(0.5 * Math.sin(theta) * Math.sin(phi));
      vertex.push(0.5 * Math.cos(theta));
      vertex.push(0.5 * Math.sin(theta) * Math.cos(phi));
      normal.push(0.5 * Math.sin(theta) * Math.sin(phi));
      normal.push(0.5 * Math.cos(theta));
      normal.push(0.5 * Math.sin(theta) * Math.cos(phi));
      uv.push(phi / (Math.PI * 2));
      uv.push(1 - theta / (Math.PI));
    }
  }

  for (let i = 0; i < column; i += 1) {
    for (let j = 0; j < row; j += 1) {
      index.push(i * (row + 1) + j);
      index.push((i + 1) * (row + 1) + j);
      index.push(i * (row + 1) + j + 1);
      index.push(i * (row + 1) + j + 1);
      index.push((i + 1) * (row + 1) + j);
      index.push((i + 1) * (row + 1) + j + 1);
    }
  }

  return new Geometry(vertex, normal, uv, index);
};

export { Sphere };
