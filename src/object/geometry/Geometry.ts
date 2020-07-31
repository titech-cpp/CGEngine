const createVBO = (
  gl: WebGLRenderingContext,
  data: number[],
): WebGLBuffer => {
  const vbo: WebGLBuffer = <WebGLBuffer>gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return vbo;
};

const createIBO = (
  gl: WebGLRenderingContext,
  index: number[],
): WebGLBuffer => {
  const ibo: WebGLBuffer = <WebGLBuffer>gl.createBuffer();

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(index), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return ibo;
};

class Geometry {
  private vertex: number[];

  private tangent: number[] | undefined;

  private bitangent: number[] | undefined;

  private normal: number[];

  private uv : number[];

  private index : number[];

  private vertexLocation: GLint = -1;

  private tangentLocation: GLint = -1;

  private bitangentLocation: GLint = -1;

  private normalLocation: GLint = -1;

  private uvLocation : GLint = -1;

  private vertexVBO : WebGLBuffer | null = null;

  private tangentVBO : WebGLBuffer | null = null;

  private bitangentVBO : WebGLBuffer | null = null;

  private normalVBO : WebGLBuffer | null = null;

  private uvVBO : WebGLBuffer | null = null;

  private indexIBO : WebGLBuffer | null = null;

  constructor(
    vertex: number[],
    normal: number[],
    uv: number[],
    index: number[],
    tangent: number[],
    bitangent: number[],
  ) {
    this.vertex = vertex;
    this.normal = normal;
    this.uv = uv;
    this.index = index;
    this.tangent = tangent;
    this.bitangent = bitangent;
  }

  // Attribute情報の設定
  setupAttribute(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
  ): void {
    this.vertexLocation = gl.getAttribLocation(program, 'vertex');
    this.normalLocation = gl.getAttribLocation(program, 'normal');
    this.uvLocation = gl.getAttribLocation(program, 'uv');
    this.vertexVBO = createVBO(gl, this.vertex);
    this.normalVBO = createVBO(gl, this.normal);
    this.uvVBO = createVBO(gl, this.uv);
    this.indexIBO = createIBO(gl, this.index);
    if (this.tangent && this.bitangent) {
      this.tangentLocation = gl.getAttribLocation(program, 'tangent');
      this.bitangentLocation = gl.getAttribLocation(program, 'bitangent');
      this.tangentVBO = createVBO(gl, this.tangent);
      this.bitangentVBO = createVBO(gl, this.bitangent);
    }
  }

  attachAttribute(
    gl:WebGLRenderingContext,
  ): void {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexVBO);
    gl.enableVertexAttribArray(this.vertexLocation);
    gl.vertexAttribPointer(this.vertexLocation, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalVBO);
    gl.enableVertexAttribArray(this.normalLocation);
    gl.vertexAttribPointer(this.normalLocation, 3, gl.FLOAT, true, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvVBO);
    gl.enableVertexAttribArray(this.uvLocation);
    gl.vertexAttribPointer(this.uvLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexIBO);
    if (this.tangent && this.bitangent) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.tangentVBO);
      gl.enableVertexAttribArray(this.tangentLocation);
      gl.vertexAttribPointer(this.tangentLocation, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bitangentVBO);
      gl.enableVertexAttribArray(this.bitangentLocation);
      gl.vertexAttribPointer(this.bitangentLocation, 3, gl.FLOAT, false, 0, 0);
    }
  }

  getIndexLength(): number {
    return this.index.length;
  }
}

export { Geometry };
