export class Geometry
{
  constructor(vertex: number[], normal: number[], uv: number[], index: number[]);

  setupAttribute(gl: WebGLRenderingContext, program: WebGLProgram): void;

  attachAttribute(gl: WebGLRenderingContext): void;
}