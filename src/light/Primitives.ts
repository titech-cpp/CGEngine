import { Directional } from './lights/Directional';
import { Point } from './lights/Point';
import { Spot } from './lights/Spot';
import { Vector3 } from '../utils/Vector';
import { Color } from '../utils/Color';

type LightsUniform = {
  uDirectionalLight: {
    dir: Vector3,
    color: Color,
  }[],
  uDirectionalNum: number,
  uPointLight: {
    pos: Vector3,
    color: Color,
    distance: number,
    decay: number,
  }[],
  uPointNum: number,
  uSpotLight: {
    pos: Vector3,
    dir: Vector3,
    color: Color,
    decay: number,
    distance: number,
    coneCos: number,
    penumbraCos: number,
  }[],
  uSpotNum: number,
};

const originalLightsUniform: string = JSON.stringify({
  uDirectionalLight: [],
  uDirectionalNum: 0,
  uPointLight: [],
  uPointNum: 0,
  uSpotLight: [],
  uSpotNum: 0,
});

export {
  Directional,
  Point,
  Spot,
  LightsUniform,
  originalLightsUniform,
};
