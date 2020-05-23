class Geometry
{
  private vertex: number[];
  private normal: number[];
  private uv    : number[];
  private index : number[];

  private vertexLocation: GLint = -1;
  private normalLocation: GLint = -1;
  private uvLocation    : GLint = -1;

  private vertexVBO     : WebGLBuffer | null = null;
  private normalVBO     : WebGLBuffer | null = null;
  private uvVBO         : WebGLBuffer | null = null;
  private indexIBO      : WebGLBuffer | null = null;

  constructor(
    vertex: number[], normal: number[], uv: number[], index: number[],
  ) {
    this.vertex = vertex;
    this.normal = normal;
    this.uv     = uv;
    this.index  = index;
  }

  private createVBO(
    gl: WebGLRenderingContext,
    data: number[]
  ): WebGLBuffer
  {
    const vbo: WebGLBuffer = <WebGLBuffer>gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
  }

  private createIBO(
    gl: WebGLRenderingContext,
    index: number[]
  ): WebGLBuffer
  {
    const ibo: WebGLBuffer = <WebGLBuffer>gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(index), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return ibo;
  }

    // Attribute情報の設定
  setupAttribute(
    gl: WebGLRenderingContext,
    program: WebGLProgram
  ): void
  {
    this.vertexLocation  = gl.getAttribLocation(program, 'vertex');
    this.normalLocation  = gl.getAttribLocation(program, 'normal');
    this.uvLocation      = gl.getAttribLocation(program, 'uv');
    this.vertexVBO       = this.createVBO(gl, this.vertex);
    this.normalVBO       = this.createVBO(gl, this.normal);
    this.uvVBO           = this.createVBO(gl, this.uv);
    this.indexIBO        = this.createIBO(gl, this.index);
  }

  attachAttribute(
    gl:WebGLRenderingContext
  ): void
  {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexVBO);
    gl.enableVertexAttribArray(this.vertexLocation);
    gl.vertexAttribPointer(this.vertexLocation, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalVBO);
    gl.enableVertexAttribArray(this.normalLocation);
    gl.vertexAttribPointer(this.normalLocation, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvVBO);
    gl.enableVertexAttribArray(this.uvLocation);
    gl.vertexAttribPointer(this.uvLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexIBO);
  }

}

export { Geometry }