import { Geometry } from './geometry/Geometry';
import { Material } from './material/Material';
import { Transform } from './transform/Transform';
import { Matrix4 } from '../utils/Matrix';

class Entity {
  geometry: Geometry | undefined;

  material: Material | undefined;
  isEmpty: boolean = false;

  transform: Transform;

  program: WebGLProgram | null = null;

  children: Entity[] = [];

  constructor(geometry?: Geometry, material?: Material) {
    if(!geometry || !material){
      this.isEmpty = true;
    }
    this.geometry = geometry;
    this.material = material;
    this.transform = new Transform();
  }

  initialize(
    gl: WebGLRenderingContext,
  ): void {
    if(!this.isEmpty){
      this.program = <WebGLProgram>gl.createProgram();
      (<Material>this.material).initialize(gl, this.program);
      (<Geometry>this.geometry).setupAttribute(gl, this.program);
    }
    this.children.map((child) => child.initialize(gl));
  }

  render(gl: WebGLRenderingContext, parentMat: Matrix4, option: any): void {
    const thisMat: Matrix4 = <Matrix4>parentMat.multiply(
      this.transform.getMatrix(),
    );

    if(!this.isEmpty){
      (<Material>this.material).uniform.mMatrix = thisMat;
      (<Material>this.material).uniform.vMatrix = option.vMatrix;
      (<Material>this.material).uniform.pMatrix = option.pMatrix;

      gl.useProgram(this.program);
      (<Material>this.material).setUniforms(gl);
      (<Geometry>this.geometry).attachAttribute(gl);
      gl.drawElements(gl.TRIANGLES, (<Geometry>this.geometry).getIndexLength(), gl.UNSIGNED_SHORT, 0);
    }
    this.children.map((child) => child.render(gl, thisMat, option));
  }
}

export { Entity };
