export default class FpsText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene) {
    const position = { x: 10, y: 10 }
    super(scene, position.x, position.y, '', { color: 'black', fontSize: '18px', fontFamily: 'OneSize' })
    scene.add.existing(this)
    this.setOrigin(0)
  }

  public update() {
    this.setText(`FPS: ${Math.floor(this.scene.game.loop.actualFps)}`)
  }
}
