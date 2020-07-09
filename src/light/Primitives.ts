import { Directional } from './lights/Directional';
import { Point } from './lights/Point';
import { Vector3 } from '../utils/Vector';
import { Color } from '../utils/Color';

type LightsUniform = {
  uDirectionalLight: {dir: Vector3, color: Color}[],
  uDirectionalNum: number,
  uPointLight: {pos: Vector3, color: Color, decay: number}[],
  uPointNum: number,
};

const originalLightsUniform: LightsUniform = {
  uDirectionalLight: [],
  uDirectionalNum: 0,
  uPointLight: [],
  uPointNum: 0,
};

export {
  Directional,
  Point,
  LightsUniform,
  originalLightsUniform,
};
