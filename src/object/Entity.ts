import { Geometry } from './geometry/Geometry';
import { Material } from './material/Material';
import { Transform } from './transform/Transform';
import { Matrix4 } from '../utils/Matrix';

class Entity {
  geometry: Geometry;

  material: Material;

  transform: Transform;

  program: WebGLProgram | null = null;

  children: Entity[] = [];

  constructor(geometry: Geometry, material: Material) {
    this.geometry = geometry;
    this.material = material;
    this.transform = new Transform();
  }

  initialize(
    gl: WebGLRenderingContext,
  ): void {
    this.program = <WebGLProgram>gl.createProgram();
    this.material.initialize(gl, this.program);
    this.geometry.setupAttribute(gl, this.program);
    this.children.map((child) => child.initialize(gl));
  }

  render(gl: WebGLRenderingContext, parentMat: Matrix4, vpMatrix: Matrix4): void {
    const thisMat: Matrix4 = <Matrix4>parentMat.multiply(
      this.transform.getMatrix(),
    );
    this.material.uniform.mMatrix = thisMat;
    this.material.uniform.vpMatrix = vpMatrix;

    this.material.setUniforms(gl);
    this.geometry.attachAttribute(gl);
    gl.drawElements(gl.TRIANGLES, this.geometry.getIndexLength(), gl.UNSIGNED_SHORT, 0);

    this.children.map((child) => child.render(gl, thisMat, vpMatrix));
  }
}

export { Entity };
