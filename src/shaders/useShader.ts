import {Vector2, Vector3, Vector4} from '../utils/Vector';


type UniformType = number | Vector2 | Vector3 | Vector4;


class useShader
{
  private vertexSource: string;
  private fragmentSource: string;
  public uniform: {[s: string]: UniformType};
  private vertexShader: WebGLShader | null = null;
  private fragmentShader: WebGLShader | null = null;

  private uniformLocations: {[s: string]: WebGLUniformLocation} = {};
  
  constructor(vertex: string, fragment: string, uniform: {})
  {
    this.vertexSource = vertex;
    this.fragmentSource = fragment;
    this.uniform = uniform;
  }

  private compileShader(
    gl: WebGLRenderingContext,
    shader: WebGLShader,
    source: string
  ): void
  {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(<string>gl.getShaderInfoLog(shader));
    }
  }

  initialize(
    gl: WebGLRenderingContext,
    program: WebGLProgram
  )
  {
    this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
    this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    this.compileShader(gl, <WebGLShader>this.vertexShader, this.vertexSource);
    this.compileShader(gl, <WebGLShader>this.fragmentShader, this.fragmentSource);

    for(let name in this.uniform)
    {
      this.uniformLocations[name] = <WebGLUniformLocation>gl.getUniformLocation(program, name);
    }
  }

  uniformSwitcher(
    gl: WebGLRenderingContext,
    uniLocation: WebGLUniformLocation,
    data: UniformType
  ): void 
  {
    if(data instanceof Vector2)
    {
      gl.uniform2fv(uniLocation, data.getArray());
    } else if(data instanceof Vector3)
    {
      gl.uniform3fv(uniLocation, data.getArray());
    } else if(data instanceof Vector4)
    {
      gl.uniform4fv(uniLocation, data.getArray());
    } else if(typeof data == 'number')
    {
      if(data % 1.0 == 0.0)
      {
        gl.uniform1i(uniLocation, data);
      }else{
        gl.uniform1f(uniLocation, data);
      }
      
    }
  }

  setUniforms(
    gl: WebGLRenderingContext,
    ): void
  {
    for(let name in this.uniformLocations)
    {
      this.uniformSwitcher(gl, this.uniformLocations[name], this.uniform[name]);
    }
  }
}
