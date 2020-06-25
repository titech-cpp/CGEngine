import { Empty } from './Empty';
import { Geometry } from './geometry/Geometry';
import { Material } from './material/Material';

class Entity extends Empty {
  geometry: Geometry;

  material: Material;

  program: WebGLProgram | null = null;

  constructor(geometry: Geometry, material: Material) {
    super();
    this.geometry = geometry;
    this.material = material;
  }

  initialize(
    gl: WebGLRenderingContext,
  ): void {
    this.program = <WebGLProgram>gl.createProgram();
    (<Material> this.material).initialize(gl, this.program);
    (<Geometry> this.geometry).setupAttribute(gl, this.program);
    super.initialize(gl);
  }

  render(gl: WebGLRenderingContext, option: any): void {
    this.material.uniform.mMatrix = this.thisMat;
    this.material.uniform.vMatrix = option.vMatrix;
    this.material.uniform.pMatrix = option.pMatrix;
    this.material.uniform.lights = option.lights;
    this.material.uniform.lightNum = option.lightNum;

    gl.useProgram(this.program);
    this.material.setUniforms(gl);
    this.geometry.attachAttribute(gl);

    gl.drawElements(
      gl.TRIANGLES,
      this.geometry.getIndexLength(),
      gl.UNSIGNED_SHORT,
      0,
    );

    super.render(gl, option);
  }
}

export { Entity };
