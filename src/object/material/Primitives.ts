import * as vbasic from './vertex/Basic';
import * as fbasic from './fragment/Basic';
import * as phong from './fragment/Phong';
import * as physical from './fragment/Physical';
import { Primitives as PBRPrimitives } from './fragment/BRDF/Primitives';
import * as PBRFunctions from './fragment/BRDF/Functions';

const ShaderPrimitives: {[key: string]: any} = {
  ...vbasic,
  ...fbasic,
  ...phong,
  ...physical,
};

export { ShaderPrimitives, PBRPrimitives, PBRFunctions };
