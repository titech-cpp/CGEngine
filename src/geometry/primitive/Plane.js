import { Geometry } from '../Geometry';

function Plane()
{
  var vertex = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,
  ];
  var normal = [
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
  ];
  var uv = [
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,
  ];
  var index = [
    0, 1, 2,
    0, 2, 3,
  ];

  return Geometry(vertex, normal, uv, index);
}