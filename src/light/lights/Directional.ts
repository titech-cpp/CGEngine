/* eslint-disable no-param-reassign */
import { Light } from '../Light';
import { Vector3, Vector4 } from '../../utils/Vector';
import { Matrix4 } from '../../utils/Matrix';
import { LightsUniform } from '../Primitives';

import { Color } from '../../utils/Color';

class Directional extends Light {
  color: Color;

  constructor(color: Color) {
    super();
    this.color = color;
  }

  searchLight(lightsList: LightsUniform):void {
    lightsList.uDirectionalLight.push({
      dir: new Vector3(0, 1, 0),
      color: new Color(1, 1, 1),
    });
    lightsList.uDirectionalNum = <number>lightsList.uDirectionalNum + 1;
    super.searchLight(lightsList);
  }

  prepare(parentMat: Matrix4, lightsList: LightsUniform): void {
    this.thisMat = <Matrix4>parentMat.multiply(
      this.transform.getMatrix(),
    );

    const dir: Vector4 = <Vector4> this.thisMat
      .getScaleRotationMatrix()
      .multiply(new Vector4(0, 0, -1, 0));
    lightsList.uDirectionalLight.push({
      dir: new Vector3(dir.x, dir.y, dir.z).normalize(),
      color: this.color,
    });
    lightsList.uDirectionalNum = <number>lightsList.uDirectionalNum + 1;
    this.children.map((child) => child.prepare(this.thisMat, lightsList));
  }
}

export { Directional };
