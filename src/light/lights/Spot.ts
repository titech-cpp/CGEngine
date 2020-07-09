/* eslint-disable no-param-reassign */
import { Light } from '../Light';
import { Vector3, Vector4 } from '../../utils/Vector';
import { Matrix4 } from '../../utils/Matrix';
import { LightsUniform } from '../Primitives';

import { Color } from '../../utils/Color';

class Spot extends Light {
  color: Color;

  decay: number;

  coneCos: number;

  penumbraCos: number;

  constructor(_color: Color, _coneCos: number, _penumbraCos: number, _decay: number) {
    super();
    this.color = _color;
    this.decay = _decay || 1;
    this.coneCos = _coneCos;
    this.penumbraCos = _penumbraCos;
  }

  searchLight(lightsList: LightsUniform):void {
    lightsList.uSpotLight.push({
      pos: new Vector3(0, 0, 0),
      dir: new Vector3(0, -1, 0),
      color: this.color,
      decay: this.decay,
      coneCos: this.coneCos,
      penumbraCos: this.penumbraCos,
    });
    lightsList.uSpotNum += 1;
    super.searchLight(lightsList);
  }

  prepare(parentMat: Matrix4, lightsList: LightsUniform): void {
    this.thisMat = <Matrix4>parentMat.multiply(
      this.transform.getMatrix(),
    );

    const dir: Vector4 = <Vector4> this.thisMat
      .getScaleRotationMatrix()
      .multiply(new Vector4(0, -1, 0, 0));

    lightsList.uSpotLight.push({
      pos: new Vector3(this.thisMat.matrix[12], this.thisMat.matrix[13], this.thisMat.matrix[14]),
      dir: new Vector3(dir.x, dir.y, dir.z),
      color: this.color,
      decay: this.decay,
      coneCos: this.coneCos,
      penumbraCos: this.penumbraCos,
    });
    lightsList.uSpotNum += 1;
    this.children.map((child) => child.prepare(this.thisMat, lightsList));
  }
}

export { Spot };
