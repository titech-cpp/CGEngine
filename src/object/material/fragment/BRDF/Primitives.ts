import {
  Diffuse,
  Distribution,
  GeometricalAttenuation,
  Fresnel,
  BRDF,
} from './Functions';

const Primitives: {[key: string]: string} = {
  Standard:
    Diffuse.NormalizedLambert
    + Distribution.GGX
    + GeometricalAttenuation.SmithSchlickGGX
    + Fresnel.Schlick + BRDF.Four,
  CookTorrance:
    Diffuse.NormalizedLambert
    + Distribution.Beckmann
    + GeometricalAttenuation.G
    + Fresnel.Schlick + BRDF.Four,
  TorranceSparrow:
    Diffuse.NormalizedLambert
    + Distribution.Beckmann
    + GeometricalAttenuation.G
    + Fresnel.Schlick + BRDF.Four,
};

export { Primitives };
