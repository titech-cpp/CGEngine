import { Directional } from './lights/Directional';
import { Vector3 } from '../utils/Vector';
import { Color } from '../utils/Color';

type LightsUniform = {
  uDirectionalLight: {dir: Vector3, color: Color}[],
  uDirectionalNum: number,
};

export { Directional, LightsUniform };
