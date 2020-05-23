const basicFragment: string = `
precision mediump float;
uniform vec4 mainColor;

void main(void)
{
  gl_FragColor = mainColor;
}
`;

export { basicFragment };