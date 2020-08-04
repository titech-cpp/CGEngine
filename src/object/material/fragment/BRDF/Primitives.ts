import {
  DiffuseBRDF,
  Distribution,
  GeometricalAttenuation,
  Fresnel,
  SpecularBRDF,
} from './Functions';

const Primitives: {[key: string]: string} = {
  Standard:
    DiffuseBRDF.NormalizedLambert
    + Distribution.GGX
    + GeometricalAttenuation.SmithSchlickGGX
    + Fresnel.Schlick + SpecularBRDF.Four,
  CookTorrance:
    DiffuseBRDF.NormalizedLambert
    + Distribution.Beckmann
    + GeometricalAttenuation.General
    + Fresnel.Schlick + SpecularBRDF.Pi,
};

export { Primitives };
