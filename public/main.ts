import * as CGEngine from '../src/main';

window.addEventListener('load', () => {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnv');

  const renderer: CGEngine.Renderer = new CGEngine.Renderer({
    canvas,
    clearColor: new CGEngine.Color(0.0, 0.0, 0.0, 1.0),
    clearDepth: 1,
  });

  const camera: CGEngine.PerspectiveCamera = new CGEngine.PerspectiveCamera(60, 1, 0.1, 1000);

  camera.transform.position.z = -1;

  const entity: CGEngine.Entity = new CGEngine.Entity(
    CGEngine.GeometryPrimitives.Plane(),
    new CGEngine.Material(
      CGEngine.ShaderPrimitives.basicVertex,
      CGEngine.ShaderPrimitives.basicFragment,
      {
        mainColor: new CGEngine.Vector4(1, 0, 0, 1),
      },
    ),
  );

  renderer.render(camera, entity);
});
