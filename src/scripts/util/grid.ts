export type GridConfig = {
  scene
  rows
  cols
  height?
  width?
}
export class Grid {
  height
  width
  rows
  cols
  cellWidth
  graphics
  scene
  cellHeight

  constructor(private config: GridConfig) {
    if (!config.scene) {
      console.log('missing scene!')
      return
    }
    if (!config.rows) {
      config.rows = 3
    }
    if (!config.cols) {
      config.cols = 3
    }
    if (!config.width) {
      config.width = config.scene.game.config.width
    }
    if (!config.height) {
      config.height = config.scene.game.config.height
    }
    this.height = config.height
    this.width = config.width
    this.rows = config.rows
    this.cols = config.cols
    //cw cell width is the scene width divided by the number of columns
    this.cellWidth = this.width / this.cols
    //ch cell height is the scene height divided the number of rows
    this.cellHeight = this.height / this.rows
    this.scene = config.scene
  }
  //place an object in relation to the grid
  placeAt(xx, yy, obj) {
    //calculate the center of the cell
    //by adding half of the height and width
    //to the x and y of the coordinates
    var x2 = this.cellWidth * xx + this.cellWidth / 2
    var y2 = this.cellHeight * yy + this.cellHeight / 2
    obj.x = x2
    obj.y = y2
  }
  //mostly for planning and debugging this will
  //create a visual representation of the grid
  show(a = 1) {
    this.graphics = this.scene.add.graphics()
    this.graphics.lineStyle(4, 0xff0000, a)
    //
    //
    //this.graphics.beginPath();
    for (var i = 0; i < this.width; i += this.cellWidth) {
      this.graphics.moveTo(i, 0)
      this.graphics.lineTo(i, this.height)
    }
    for (var i = 0; i < this.height; i += this.cellHeight) {
      this.graphics.moveTo(0, i)
      this.graphics.lineTo(this.width, i)
    }
    this.graphics.strokePath()
  }
  placeAtIndex(index, obj) {
    var yy = Math.floor(index / this.cols)
    var xx = index - yy * this.cols
    this.placeAt(xx, yy, obj)
  }
  showNumbers(a = 1) {
    this.show(a)
    var n = 0
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        var numText = this.scene.add.text(0, 0, n, {
          color: 'red'
        })
        numText.setOrigin(0.5, 0.5)
        this.placeAt(j, i, numText)
        n++
      }
    }
  }
  getIndexPos(index) {
    var yy = Math.floor(index / this.cols)
    var xx = index - yy * this.cols
    var x2 = this.cellWidth * xx + this.cellWidth / 2
    var y2 = this.cellHeight * yy + this.cellHeight / 2
    var obj = { x: 0, y: 0 }
    obj.x = x2
    obj.y = y2
    return obj
  }
}
