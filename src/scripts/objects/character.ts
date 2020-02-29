export default class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
  SPEED = 256
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    scene.physics.world.enableBody(this)
    this.setCollideWorldBounds(true)
    this.setScale(2)
  }

  walk(direction: 'right' | 'left' | 'up' | 'down') {
    switch (direction) {
      case 'right':
        if (!this.anims.isPlaying) {
          this.play('right', true)
        }
        this.setVelocityX(this.SPEED)
        return
      case 'left':
        if (!this.anims.isPlaying) {
          this.play('left', true)
        }
        this.setVelocityX(-this.SPEED)
        return
      case 'down':
        if (!this.anims.isPlaying) {
          this.play('down', true)
        }
        this.setVelocityY(this.SPEED)
        return
      case 'up':
        if (!this.anims.isPlaying) {
          this.play('up', true)
        }
        this.setVelocityY(-this.SPEED)
        return
      default:
        return
    }
  }
}
