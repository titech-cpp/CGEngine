import * as CGEngine from './src/main';

window.addEventListener('load', () => {
  const canvas = document.getElementById('cnv');

  const renderer = new CGEngine.Renderer({
    canvas,
    clearColor: new CGEngine.Color(0.0, 0.0, 0.0, 1.0),
    clearDepth: 1,
  });

  const camera = new CGEngine.PerspectiveCamera(Math.PI * 0.5, 1, 0.01, 1000);

  camera.transform.position.z = 0;
  camera.transform.position.y = 0;
  camera.transform.lookAt(new CGEngine.Vector3(1, 0, 0));

  const entity = new CGEngine.Entity(
    CGEngine.GeometryPrimitives.Plane(),
    new CGEngine.Material(
      CGEngine.ShaderPrimitives.basicVertex,
      CGEngine.ShaderPrimitives.phongFragment,
      {
        mainColor: new CGEngine.Vector4(1, 0, 0, 1),
      },
    ),
  );

  entity.transform.position.x = 0.0;
  entity.transform.position.z = 0.0;


  const entity2 = new CGEngine.Entity(
    CGEngine.GeometryPrimitives.Plane(),
    new CGEngine.Material(
      CGEngine.ShaderPrimitives.basicVertex,
      CGEngine.ShaderPrimitives.phongFragment,
      {
        mainColor: new CGEngine.Vector4(0, 1, 0, 1),
      },
    ),
  );

  entity2.transform.position.x = 1.0;
  entity2.transform.position.z = 1.0;

  const entity3 = new CGEngine.Entity(
    CGEngine.GeometryPrimitives.Plane(),
    new CGEngine.Material(
      CGEngine.ShaderPrimitives.basicVertex,
      CGEngine.ShaderPrimitives.phongFragment,
      {
        mainColor: new CGEngine.Vector4(0, 0, 1, 1),
      },
    ),
  );

  entity3.transform.position.x = -1.0;
  entity3.transform.position.y = -1.0;
  entity3.transform.position.z = 1.0;

  const parent = new CGEngine.Empty();
  parent.children.push(entity);
  parent.children.push(entity2);
  parent.children.push(entity3);


  const floor = new CGEngine.Entity(
    CGEngine.GeometryPrimitives.Plane(),
    new CGEngine.Material(
      CGEngine.ShaderPrimitives.basicVertex,
      CGEngine.ShaderPrimitives.phongFragment,
      {
        mainColor: new CGEngine.Vector4(1, 1, 1, 1),
      },
    ),
  );

  floor.transform.position.y = -1.5;
  floor.transform.rotation.eularAngle(new CGEngine.Vector3(0, 0, -Math.PI * 0.25));
  floor.transform.scale = new CGEngine.Vector3(1.0, 1.0, 1.0).multiply(10);

  const light = new CGEngine.LightPrimitives.Directional(new CGEngine.Color(1, 1, 1, 1));
  light.transform.rotation.eularAngle(new CGEngine.Vector3(Math.PI * 0.15, 0, Math.PI * 0.15));

  const root = new CGEngine.Empty();
  root.children.push(floor);
  root.children.push(parent);
  root.children.push(light);

  renderer.addEntities(root);
  let count = 0;


  function tick() {
    count += 1;
    parent.transform.rotation.eularAngle(
      new CGEngine.Vector3((count / 10) * 0.3, (count / 10) * 0.17, (count / 10) * 0.23),
    );
    camera.transform.position = new CGEngine.Vector3(
      Math.cos(count / 100) * 5,
      3,
      Math.sin(count / 100) * 5,
    );
    camera.transform.lookAt(new CGEngine.Vector3(0, 0, 0));
    renderer.render(camera);
    requestAnimationFrame(tick);
  }

  tick();
});
