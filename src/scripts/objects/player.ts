import { CharacterMovement } from '@game/types'

export class Player {
  SPEED = 256
  SHOT_SPEED = 0.4
  _head: Phaser.Physics.Arcade.Sprite
  _body: Phaser.Physics.Arcade.Sprite

  constructor(private scene: Phaser.Scene) {
    this.setupSprites()
    this.setupAnimations()
  }

  setupSprites() {
    const { height, width } = this.scene.game.renderer

    this._head = new Phaser.Physics.Arcade.Sprite(this.scene, width / 2, height / 2, 'isaac', 14)
    this._head.setDepth(2)
    this.scene.add.existing(this._head)
    this.scene.physics.add.existing(this._head)
    this.scene.physics.world.enableBody(this._head)
    this._head.body.setSize(30, 35)
    this._head.body.setOffset(5, 5)
    this._head.setCollideWorldBounds(true)
    this._head.setScale(3)

    this._body = new Phaser.Physics.Arcade.Sprite(this.scene, width / 2, 42 + height / 2, 'isaac', 0)
    this._body.setDepth(1)
    this.scene.add.existing(this._body)
    this.scene.physics.add.existing(this._body)
    this.scene.physics.world.enableBody(this._body)
    this._body.setCollideWorldBounds(true)
    this._body.body.setSize(30, 35)
    this._body.body.setOffset(1, -14)
    this._body.setScale(3)
  }

  setupAnimations() {
    this.setupBodyAnimations()
    this.setupHeadAnimations()
  }

  setupHeadAnimations() {
    this.scene.anims.create({
      key: 'shoot_idle',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames('isaac', {
        prefix: 'downshoot',
        suffix: '.png',
        start: 0
      })
    })

    this.scene.anims.create({
      key: 'shoot_right',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames('isaac', {
        prefix: 'rightshoot',
        suffix: '.png',
        start: 0,
        end: 1
      }),

      repeat: -1
    })

    this.scene.anims.create({
      key: 'shoot_left',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames('isaac', {
        prefix: 'leftshoot',
        suffix: '.png',
        start: 0,
        end: 1
      }),

      repeat: -1
    })

    this.scene.anims.create({
      key: 'shoot_down',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames('isaac', {
        prefix: 'downshoot',
        suffix: '.png',
        start: 0,
        end: 1
      }),

      repeat: -1
    })

    this.scene.anims.create({
      key: 'shoot_up',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames('isaac', {
        prefix: 'upshoot',
        suffix: '.png',
        start: 0,
        end: 1
      }),

      repeat: -1
    })
  }

  setupBodyAnimations() {
    this.scene.anims.create({
      key: 'idle',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames('isaac', {
        prefix: 'front',
        suffix: '.png',
        start: 0
      }),

      repeat: -1
    })

    this.scene.anims.create({
      key: 'right',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames('isaac', {
        prefix: 'right',
        suffix: '.png',
        start: 0,
        end: 9
      }),

      repeat: -1
    })

    this.scene.anims.create({
      key: 'left',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames('isaac', {
        prefix: 'left',
        suffix: '.png',
        start: 0,
        end: 9
      }),

      repeat: -1
    })

    this.scene.anims.create({
      key: 'up',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames('isaac', {
        prefix: 'front',
        suffix: '.png',
        start: 0,
        end: 9
      }),

      repeat: -1
    })

    this.scene.anims.create({
      key: 'down',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames('isaac', {
        prefix: 'front',
        suffix: '.png',
        start: 0,
        end: 9
      }),

      repeat: -1
    })
  }

  walk({ direction, velocity }: CharacterMovement) {
    this._body.play(direction || 'idle', true)
    this.look(direction || 'down')
    this._body.setVelocity(this.SPEED * velocity.x, this.SPEED * velocity.y)
    this._head.setVelocity(this.SPEED * velocity.x, this.SPEED * velocity.y)
  }

  look(direction: CharacterMovement['direction']) {
    if (!this._head.anims.isPlaying) {
      this._head.setFrame(`${direction}shoot0.png`)
    }
  }

  shoot(direction: CharacterMovement['direction'] | 'idle' = 'idle') {
    if (direction !== 'idle') {
      this._head.anims.setTimeScale(this.SHOT_SPEED)
    }

    this._head.play(`shoot_${direction}`, true)
  }
}
