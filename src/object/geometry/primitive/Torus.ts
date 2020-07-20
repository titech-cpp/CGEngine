import { Geometry } from '../Geometry';

const Torus = (radius: number, _tubeSegment?: number, _radialSegment?: number): Geometry => {
  const tubeSegment: number = _tubeSegment || 10;
  const radialSegment: number = _radialSegment || 10;

  const vertex: number[] = [];
  const normal: number[] = [];
  const uv: number[] = [];
  const index: number[] = [];

  for (let phi = 0; phi < Math.PI * 2 + 0.001; phi += (Math.PI * 2) / radialSegment) {
    const r: number = 0.5 - Math.cos(phi) * radius;
    const y: number = Math.sin(phi) * radius;
    for (let theta = 0; theta < Math.PI * 2 + 0.001; theta += (Math.PI * 2) / tubeSegment) {
      vertex.push(Math.cos(theta) * r);
      vertex.push(y);
      vertex.push(Math.sin(theta) * r);

      normal.push(-Math.cos(theta) * Math.cos(phi));
      normal.push(Math.sin(phi));
      normal.push(-Math.sin(theta) * Math.cos(phi));

      uv.push(phi / Math.PI / 2);
      uv.push(1 - theta / Math.PI / 2);
    }
  }

  for (let i = 0; i < radialSegment; i += 1) {
    for (let j = 0; j < tubeSegment; j += 1) {
      index.push(i * (tubeSegment + 1) + j);
      index.push((i + 1) * (tubeSegment + 1) + j + 1);
      index.push((i + 1) * (tubeSegment + 1) + j);

      index.push(i * (tubeSegment + 1) + j);
      index.push(i * (tubeSegment + 1) + j + 1);
      index.push((i + 1) * (tubeSegment + 1) + j + 1);
    }
  }
  return new Geometry(vertex, normal, uv, index);
};

export { Torus };
