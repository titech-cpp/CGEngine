import { Color } from '../utils/Color';

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

  constructor(_parameter: RendererParameter) {
    this.parameter = _parameter;
    this.canvas = this.parameter.canvas;
    this.gl = <WebGLRenderingContext> this.canvas.getContext('webgl');
    this.parameter.clearColor = this.parameter.clearColor || new Color(0.0, 0.0, 0.0, 1.0);
    this.parameter.clearDepth = this.parameter.clearDepth || 1.0;
  }

  // カメラとオブジェクトリストが実装されてから

  // render(camera, objectList)
  // {
  //   const clearColor: Color = <Color>this.parameter.clearColor;
  //   this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
  //   this.gl.clearDepth(<number>this.parameter.clearDepth);
  //   this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);

  // }
}

export { Renderer };
