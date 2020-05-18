import { Camera } from '../camera/Camera';
import { ObjectList } from '../object/ObjectList';

export class Renderer
{
  constructor(canvas: HTMLCanvasElement, settings: Object)

  domElement: HTMLCanvasElement;

  context: WebGLRenderingContext;

  render(camera: Camera, objectList: ObjectList): void;
}