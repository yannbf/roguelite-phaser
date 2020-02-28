import { IMAGES } from '../constants'

export default class PhaserLogo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, IMAGES.LOGO)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
      .setBounce(0.6)
      .setInteractive()
      .on('pointerdown', () => {
        this.setVelocityY(-400)
      })
  }
}
