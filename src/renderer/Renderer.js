import { Color } from '../utils/Color';

function Renderer(_parameter)
{
  var parameter = _parameter || {};
  var canvas      = parameter.canvas || document.createElement('canvas');
  var gl          = canvas.getContext('webgl');
  var clearColor  = parameter.clearColor || new Color(0.0, 0.0, 0.0, 1.0);
  var clearDepth  = parameter.clearDepth || 1.0;

  this.canvas     = canvas;
  this.context    = gl;
  

  this.render = function(camera, objectList)
  {
    gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
    gl.clearDepth(clearDepth);
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
    
  }
}