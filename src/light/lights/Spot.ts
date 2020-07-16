/* eslint-disable no-param-reassign */
import { Light } from '../Light';
import { Vector3, Vector4 } from '../../utils/Vector';
import { Matrix4 } from '../../utils/Matrix';
import { LightsUniform } from '../Primitives';

import { Color } from '../../utils/Color';

class Spot extends Light {
  color: Color;

  decay: number;

  distance: number;

  coneCos: number;

  penumbraCos: number;

  constructor(
    _color: Color,
    _coneCos: number,
    _penumbraCos: number,
    _distance: number,
    _decay?: number,
  ) {
    super();
    this.color = _color;
    this.decay = _decay || 1.000001;
    this.coneCos = Math.cos(_coneCos);
    this.penumbraCos = Math.cos(_penumbraCos);
    this.distance = _distance;
  }

  searchLight(lightsList: LightsUniform):void {
    lightsList.uSpotLight.push({
      pos: new Vector3(0, 0, 0),
      dir: new Vector3(0, -1, 0),
      color: this.color,
      decay: this.decay + 0.000001,
      coneCos: this.coneCos + 0.00001,
      penumbraCos: this.penumbraCos + 0.000001,
      distance: this.distance + 0.000001,
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
      decay: this.decay + 0.000001,
      coneCos: this.coneCos + 0.000001,
      penumbraCos: this.penumbraCos + 0.000001,
      distance: this.distance + 0.000001,
    });
    lightsList.uSpotNum += 1;
    this.children.map((child) => child.prepare(this.thisMat, lightsList));
  }
}

export { Spot };
