import { CharacterMovement } from '@game/types'

export class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
  SPEED = 256
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    scene.physics.world.enableBody(this)
    this.setCollideWorldBounds(true)
    this.setScale(2)

    this.setupAnimations()
  }

  setupAnimations() {
    this.scene.anims.create({
      key: 'up',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNumbers('hooded', {
        start: 105,
        end: 112
      })
    })

    this.scene.anims.create({
      key: 'left',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNumbers('hooded', {
        start: 118,
        end: 124
      })
    })

    this.scene.anims.create({
      key: 'down',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNumbers('hooded', {
        start: 130,
        end: 138
      })
    })

    this.scene.anims.create({
      key: 'right',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNumbers('hooded', {
        start: 143,
        end: 151
      })
    })
  }

  walk({ direction, velocity }: CharacterMovement) {
    if (direction !== undefined) {
      this.play(direction, true)
    }

    this.setVelocity(this.SPEED * velocity.x, this.SPEED * velocity.y)
  }
}
