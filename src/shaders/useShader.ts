
// function useShader(vertex, fragment, uniforms)
// {
//   var vertexShader;
//   var fragmentShader;

//   var uniformLocations = [];

//   function compileShader(gl, shader, shaderSource)
//   {
//     gl.shaderSource(shader, shaderSource);
//     gl.compileShader(shader);
//     if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//       throw new Error(gl.getShaderInfoLog(shader));
//     }
//   }

//   // シェーダーをオブジェクトにアタッチしたときの
//   this.init = function(gl, program) {
//     vertexShader = gl.createShader(gl.VERTEX_SHADER);
//     compileShader(vertexShader, vertex);
//     fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
//     compileShader(fragmentShader, fragment);
//   }

// }