function XYObject (x, y) {
  this.pos_x = x
  this.pos_y = y
}

export default {
  /**
   * @param Mxy 
   * @param Txy 
   * @returns {string} 'M xy Q xy xy Txy'
   */
  calculatedCurvePathQ (Mxy = {}, Txy = {}) {
    let mtx = (Txy.pos_x - Mxy.pos_x) / 4
    let mty = (Txy.pos_y - Mxy.pos_y) / 4
    if (mty < 0 && (mtx > 10 || mtx < -10)) {
      if (mty > -10 && mty < 10) {
        this.Q1xy = new XYObject(Mxy.pos_x + 10, Mxy.pos_y + 30)
      } else {
        this.Q1xy = new XYObject(Mxy.pos_x + 10, Mxy.pos_y + 4 * Math.abs(mty))
      }
      this.Q2xy = new XYObject(Mxy.pos_x + 2 * mtx, Mxy.pos_y + 2 * mty)
    } else {
      this.Q1xy = new XYObject(Mxy.pos_x, Mxy.pos_y + 2 * mty)
      this.Q2xy = new XYObject(Mxy.pos_x + 2 * mtx, Mxy.pos_y + 2 * mty)
    }

    let path = 'M' + Mxy.pos_x.toFixed(1) + ' ' + Mxy.pos_y.toFixed(1) + ' Q ' + this.Q1xy.pos_x.toFixed(1) + ' ' + this.Q1xy.pos_y.toFixed(1) + ', ' + this.Q2xy.pos_x.toFixed(1) + ' ' + this.Q2xy.pos_y.toFixed(1) + ' T ' + Txy.pos_x.toFixed(1) + ' ' + Txy.pos_y.toFixed(1)
    return path
  },
  /**
   * @param Mxy 
   * @param Txy 
   * @returns {string} 'M xy Q xy xy Txy'
   */
  calculatedCurvePathL (Mxy = {}, Txy = {}) {
    let mtx = (Txy.pos_x - Mxy.pos_x) / 2
    let mty = (Txy.pos_y - Mxy.pos_y) / 2

    if (mty > 0) {
      this.L1xy = new XYObject(Mxy.pos_x, Mxy.pos_y + mty)
      this.L2xy = new XYObject(Txy.pos_x, Mxy.pos_y + mty)
      this.path = 'M' + Mxy.pos_x.toFixed(1) + ' ' + Mxy.pos_y.toFixed(1) + ' L ' + this.L1xy.pos_x.toFixed(1) + ' ' + this.L1xy.pos_y.toFixed(1) + ', ' + this.L2xy.pos_x.toFixed(1) + ' ' + this.L2xy.pos_y.toFixed(1) + ' T ' + Txy.pos_x.toFixed(1) + ' ' + Txy.pos_y.toFixed(1)
    } else {
      this.L1xy = new XYObject(Mxy.pos_x, Mxy.pos_y + 30)
      this.L2xy = new XYObject(Mxy.pos_x + mtx, Mxy.pos_y + 30)
      this.L3xy = new XYObject(Mxy.pos_x + mtx, Txy.pos_y - 30)
      this.L4xy = new XYObject(Txy.pos_x, Txy.pos_y - 30)
      this.path = 'M' + Mxy.pos_x.toFixed(1) + ' ' + Mxy.pos_y.toFixed(1) + ' L ' + this.L1xy.pos_x.toFixed(1) + ' ' + this.L1xy.pos_y.toFixed(1) + ', ' + this.L2xy.pos_x.toFixed(1) + ' ' + this.L2xy.pos_y.toFixed(1) + ', ' + this.L3xy.pos_x.toFixed(1) + ' ' + this.L3xy.pos_y.toFixed(1) + ', ' + this.L4xy.pos_x.toFixed(1) + ' ' + this.L4xy.pos_y.toFixed(1) + ' T ' + Txy.pos_x.toFixed(1) + ' ' + Txy.pos_y.toFixed(1)
    }
    return this.path
  },
  /**
   * @param Mxy 
   * @param Txy 
   * @returns {string} 'M xy Lxy'
   */
  calculatedCurvePathML (Mxy = {}, Txy = {}) {
    this.path = 'M' + Mxy.pos_x.toFixed(1) + ' ' + Mxy.pos_y.toFixed(1) + ' L ' + Txy.pos_x.toFixed(1) + ' ' + Txy.pos_y.toFixed(1)
    return this.path
  },
  /**
   * @param Mxy 
   * @param Txy 
   * @returns {string} 'M xy Q xy xy Txy'
   */
  drawCurvePath (Mxy = {}, Txy = {}, type = 'Q', scaling) {
    let scalingMxy = {
      x: Mxy.pos_x / scaling.ZoomX,
      y: Mxy.pos_y / scaling.ZoomY
    }

    let scalingTxy = {
      x: Txy.pos_x / scaling.ZoomX,
      y: Txy.pos_y / scaling.ZoomY
    }
    if (type === 'Q') {
      return this.calculatedCurvePathQ(scalingMxy, scalingTxy)
    } else if (type === 'L') {
      return this.calculatedCurvePathL(scalingMxy, scalingTxy)
    } else if (type === 'ML') {
      return this.calculatedCurvePathML(scalingMxy, scalingTxy)
    }
  },
  /**
   * @param Mxy
   * @param Txy
   * @param scaling
   * @returns {{Mxy: {}, Txy: {}}}
   */
  scalingCount (Mxy = {}, Txy = {}, scaling = {ZoomX: 1, ZoomY: 1}) {
    Mxy.pos_x = Mxy.pos_x * scaling.ZoomX
    Mxy.pos_y = Mxy.pos_y * scaling.ZoomY
    Txy.pos_x = Txy.pos_x * scaling.ZoomX
    Txy.pos_y = Txy.pos_y * scaling.ZoomY
    return {Mxy: Mxy, Txy: Txy}
  },
  guid () {
    function S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  }
}
