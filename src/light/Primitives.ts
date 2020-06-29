import { Directional } from './lights/Directional';
import { GLStruct } from '../utils/GLStruct';

type LightsUniform = {directional: GLStruct[]};

export { Directional, LightsUniform };
