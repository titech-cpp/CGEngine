/* eslint-disable no-param-reassign */
import { Light } from '../Light';
import { Matrix4 } from '../../utils/Matrix';
import { LightsUniform } from '../Primitives';

import { Color } from '../../utils/Color';

class Ambient extends Light {
  color: Color;

  constructor(color: Color) {
    super();
    this.color = color;
  }

  searchLight(lightsList: LightsUniform):void {
    lightsList.uAmbientLight.push({
      color: new Color(1, 1, 1),
    });
    lightsList.uAmbientNum += 1;
    super.searchLight(lightsList);
  }

  prepare(parentMat: Matrix4, lightsList: LightsUniform): void {
    this.thisMat = <Matrix4>parentMat.multiply(
      this.transform.getMatrix(),
    );

    lightsList.uAmbientLight.push({
      color: this.color,
    });
    lightsList.uAmbientNum += 1;
    this.children.map((child) => child.prepare(this.thisMat, lightsList));
  }
}

export { Ambient };
