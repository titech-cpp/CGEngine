function Geometry(vertex, normal, uv, index)
{
  var vertex = vertex;
  var normal = normal;
  var uv     = uv;
  var index  = index;

  var vertexLocation,
      normalLocation,
      uvLocation,
      vertexVBO,
      normalVBO,
      uvVBO,
      indexIBO;

  function createVBO(gl, data)
  {
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;
  }

  function createIBO(gl, index)
  {
    var ibo = gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(index), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return ibo;
  }

  this.setupAttribute = function(gl, program)
  {
    vertexLocation  = gl.getAttributeLocation(program, 'vertex');
    normalLocation  = gl.getAttributeLocation(program, 'normal');
    uvLocation      = gl.getAttributeLocation(program, 'uv');
    vertexVBO       = createVBO(gl, vertex);
    normalVBO       = createVBO(gl, normal);
    uvVBO           = createVBO(gl, uv);
    indexIBO        = createIBO(index);
  }

  this.attachAttribute = function(gl)
  {
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexVBO);
    gl.enableVertexAttribArray(vertexLocation);
    gl.vertexAttribPointer(vertexLocation, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalVBO);
    gl.enableVertexAttribArray(normalLocation);
    gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, uvVBO);
    gl.enableVertexAttribArray(uvLocation);
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexIBO);
  }
}

export { Geometry }