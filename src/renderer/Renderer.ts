import { Color } from '../utils/Color';
import { CameraType } from '../Camera/Camera';
import { Entity } from '../object/Entity';
import { Matrix4 } from '../utils/Matrix';

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

  entities: Entity | null = null;

  constructor(_parameter: RendererParameter) {
    this.parameter = _parameter;
    this.canvas = this.parameter.canvas;
    this.gl = <WebGLRenderingContext> this.canvas.getContext('webgl');
    this.parameter.clearColor = this.parameter.clearColor || new Color(0.0, 0.0, 0.0, 1.0);
    this.parameter.clearDepth = this.parameter.clearDepth || 1.0;
  }

  addEntities(entity: Entity) {
    entity.initialize(this.gl);
    this.entities = entity;
  }

  render(camera: CameraType) {
    console.assert(!!this.entities, 'Entities are not initialized');
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);

    const clearColor: Color = <Color> this.parameter.clearColor;
    this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
    this.gl.clearDepth(<number> this.parameter.clearDepth);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);

    const option: {vMatrix: Matrix4, pMatrix: Matrix4} = camera.getMatrix();
    (<Entity>this.entities).render(this.gl, new Matrix4(), option);
  }
}

export { Renderer };
