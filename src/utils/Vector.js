function Vector2(x, y)
{
  this.x = x;
  this.y = y;

  this.length = function()
  {
    return Math.sqrt(Math.pow(x, 2.0) + Math.pow(y, 2.0));
  }
}

Vector2.prototype = {
  distance: function(a, b){
    return Math.sqrt(Math.pow(a.x - b.x, 2.0) + Math.pow(a.y - b.y, 2.0));
  }
}

function Vector3(x, y, z)
{
  this.x = x;
  this.y = y;
  this.z = z;

  this.length = function()
  {
    return Math.sqrt(Math.pow(x, 2.0) + Math.pow(y, 2.0) + Math.pow(z, 2.0));
  }
}

Vector3.prototype = {
  distance: function(a, b){
    return Math.sqrt(Math.pow(a.x - b.x, 2.0) + Math.pow(a.y - b.y, 2.0) + Math.pow(a.z - b.z, 2.0));
  }
}

function Vector4(x, y, z, w)
{
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;

  this.length = function()
  {
    return Math.sqrt(Math.pow(x, 2.0) + Math.pow(y, 2.0) + Math.pow(z, 2.0) + Math.pow(w, 2.0));
  }
}

Vector4.prototype = {
  distance: function(a, b){
    return Math.sqrt(Math.pow(a.x - b.x, 2.0) + Math.pow(a.y - b.y, 2.0) + Math.pow(a.z - b.z, 2.0) + Math.pow(a.w - b.w, 2.0));
  }
}

export { Vector2, Vector3, Vector4 };