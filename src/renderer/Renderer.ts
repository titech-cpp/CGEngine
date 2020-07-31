import { Color } from '../utils/Color';
import { CameraType } from '../camera/Camera';
import { Entity } from '../object/Entity';
import { Matrix4 } from '../utils/Matrix';
import { ObjectToGLStructure } from '../utils/ObjectToGLStructure';
import { LightsUniform, originalLightsUniform } from '../light/Primitives';
import { Empty } from '../object/Empty';
import { UniformType } from '../utils/UniformSwitcher';
import { Integer } from '../utils/Integer';

interface RendererParameter
{
  canvas : HTMLCanvasElement;
  clearColor : Color | undefined;
  clearDepth : number | undefined;
}

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
    const lightsList: LightsUniform = JSON.parse(originalLightsUniform);
    this.entities = entity;
    this.entities.searchLight(lightsList);

    const lightsUniform = ObjectToGLStructure(lightsList);

    const defaultUniform = {
      mMatrix: null,
      vMatrix: null,
      pMatrix: null,
      rMatrix: null,
      uCameraPos: null,
      ...lightsUniform,
    };
    this.entities.initialize(this.gl, defaultUniform);
  }

  render(camera: CameraType) {
    console.assert(!!this.entities, 'Entities are not initialized');
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.enable(this.gl.CULL_FACE);

    const clearColor: Color = <Color> this.parameter.clearColor;
    this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
    this.gl.clearDepth(<number> this.parameter.clearDepth);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);

    if (!this.entities) return;
    const lightsList: LightsUniform = JSON.parse(originalLightsUniform);
    this.entities.prepare(new Matrix4(), lightsList);

    lightsList.uDirectionalNum = new Integer(lightsList.uDirectionalNum);
    lightsList.uPointNum = new Integer(lightsList.uPointNum);
    lightsList.uSpotNum = new Integer(lightsList.uSpotNum);
    lightsList.uAmbientNum = new Integer(lightsList.uAmbientNum);

    const lightsUniform: {[key: string]: UniformType} = ObjectToGLStructure(lightsList);

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
