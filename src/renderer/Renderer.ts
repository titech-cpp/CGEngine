import { Color } from '../utils/Color';
import { CameraType } from '../camera/Camera';
import { Entity } from '../object/Entity';
import { Matrix4 } from '../utils/Matrix';
import { ObjectToGLStructure } from '../utils/ObjectToGLStructure';
import { LightsUniform } from '../light/Primitives';
import { Empty } from '../object/Empty';
import { UniformType } from '../utils/UniformSwitcher';

interface RendererParameter
{
  canvas : HTMLCanvasElement;
  clearColor : Color | undefined;
  clearDepth : number | undefined;
}

const LightsUniformFormatter = (_lights: LightsUniform) => {
  const lights = _lights;
  lights.uDirectionalNum = lights.uDirectionalLight.length;

  return ObjectToGLStructure(lights);
};

class Renderer {
  private parameter : RendererParameter;

  public canvas : HTMLCanvasElement;

  private gl : WebGLRenderingContext;

  entities: Empty | null = null;

  constructor(_parameter: RendererParameter) {
    this.parameter = _parameter;
    this.canvas = this.parameter.canvas;
    this.gl = <WebGLRenderingContext> this.canvas.getContext('webgl');
    this.parameter.clearColor = this.parameter.clearColor || new Color(0.0, 0.0, 0.0, 1.0);
    this.parameter.clearDepth = this.parameter.clearDepth || 1.0;
  }

  addEntities(entity: Empty) {
    const lightsList: LightsUniform = {
      uDirectionalLight: [],
      uDirectionalNum: 0,
    };
    this.entities = entity;
    this.entities.searchLight(lightsList);

    const lightsUniform = LightsUniformFormatter(lightsList);

    const defaultUniform = {
      mMatrix: null,
      vMatrix: null,
      pMatrix: null,
      ...lightsUniform,
    };
    this.entities.initialize(this.gl, defaultUniform);
  }

  render(camera: CameraType) {
    console.assert(!!this.entities, 'Entities are not initialized');
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);

    const clearColor: Color = <Color> this.parameter.clearColor;
    this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
    this.gl.clearDepth(<number> this.parameter.clearDepth);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);

    if (!this.entities) return;
    const lightsList: LightsUniform = {
      uDirectionalLight: [],
      uDirectionalNum: 0,
    };
    this.entities.prepare(new Matrix4(), lightsList);

    const lightsUniform: {[key: string]: UniformType} = LightsUniformFormatter(lightsList);

    const option: {
      uniforms: {[key: string]: UniformType}
    } = {
      uniforms: {
        ...lightsUniform,
        ...camera.getMatrix(),
      },
    };

    this.entities.render(this.gl, option);
  }
}

export { Renderer };
