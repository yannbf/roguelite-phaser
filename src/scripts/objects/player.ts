import { CharacterMovement, Direction } from '@game/types'
import { AUDIOS, SPRITES } from '@game/constants'
import { BaseScene } from '@game/scenes'
import { Tears } from './projectile'

export class Player {
  private BASE_SPEED = 256
  private SPEED_MULTIPLIER = 1
  private SHOT_SPEED = 0.4
  private RANGE = 0.4
  private tearSound: Phaser.Sound.BaseSound
  private tearCooldown = 0
  private tears: Tears
  _head: Phaser.Physics.Arcade.Sprite
  _body: Phaser.Physics.Arcade.Sprite

  constructor(private scene: BaseScene) {
    this.setupSprites()
    this.setupAnimations()

    this.tears = new Tears(this.scene)
  }

  private get speed() {
    return this.BASE_SPEED * this.SPEED_MULTIPLIER
  }

  setSpeed(speed: number) {
    this.SPEED_MULTIPLIER = speed
  }

  setupSprites() {
    const initialX = this.scene.halfWidth
    const initialY = this.scene.height * 0.75

    this._body = this.createSprite(initialX, 42 + initialY)
    this._body.body.setOffset(1, -14)

    this._head = this.createSprite(initialX, initialY)
    this._head.body.setOffset(5, 5)

    this.tearSound = this.scene.sound.add(AUDIOS.TEAR, { volume: 0.5 })
  }

  createSprite(initialX, initialY): Phaser.Physics.Arcade.Sprite {
    const sprite = new Phaser.Physics.Arcade.Sprite(this.scene, initialX, initialY, SPRITES.ISAAC, 0)
    sprite.setDepth(1)
    this.scene.add.existing(sprite)
    this.scene.physics.add.existing(sprite)
    this.scene.physics.world.enableBody(sprite)
    sprite.setCollideWorldBounds(true)
    sprite.body.setSize(30, 35)
    sprite.setScale(3)
    sprite.setDamping(true)
    sprite.setDrag(0.9)

    return sprite
  }

  setupAnimations() {
    this.setupBodyAnimations()
    this.setupHeadAnimations()
  }

  setupHeadAnimations() {
    this.scene.anims.create({
      key: 'shoot_idle',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames(SPRITES.ISAAC, {
        prefix: 'downshoot',
        suffix: '.png',
        start: 0,
      }),
    })

    this.scene.anims.create({
      key: 'shoot_right',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames(SPRITES.ISAAC, {
        prefix: 'rightshoot',
        suffix: '.png',
        start: 0,
        end: 1,
      }),

      repeat: -1,
    })

    this.scene.anims.create({
      key: 'shoot_left',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames(SPRITES.ISAAC, {
        prefix: 'leftshoot',
        suffix: '.png',
        start: 0,
        end: 1,
      }),

      repeat: -1,
    })

    this.scene.anims.create({
      key: 'shoot_down',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames(SPRITES.ISAAC, {
        prefix: 'downshoot',
        suffix: '.png',
        start: 0,
        end: 1,
      }),

      repeat: -1,
    })

    this.scene.anims.create({
      key: 'shoot_up',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames(SPRITES.ISAAC, {
        prefix: 'upshoot',
        suffix: '.png',
        start: 0,
        end: 1,
      }),

      repeat: -1,
    })
  }

  setupBodyAnimations() {
    this.scene.anims.create({
      key: 'idle',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames(SPRITES.ISAAC, {
        prefix: 'front',
        suffix: '.png',
        start: 0,
      }),

      repeat: -1,
    })

    this.scene.anims.create({
      key: 'right',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames(SPRITES.ISAAC, {
        prefix: 'right',
        suffix: '.png',
        start: 0,
        end: 9,
      }),

      repeat: -1,
    })

    this.scene.anims.create({
      key: 'left',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames(SPRITES.ISAAC, {
        prefix: 'left',
        suffix: '.png',
        start: 0,
        end: 9,
      }),

      repeat: -1,
    })

    this.scene.anims.create({
      key: 'up',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames(SPRITES.ISAAC, {
        prefix: 'front',
        suffix: '.png',
        start: 0,
        end: 9,
      }),

      repeat: -1,
    })

    this.scene.anims.create({
      key: 'down',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames(SPRITES.ISAAC, {
        prefix: 'front',
        suffix: '.png',
        start: 0,
        end: 9,
      }),

      repeat: -1,
    })
  }

  walk({ direction, velocity }: CharacterMovement) {
    this._body.play(direction || 'idle', true)
    this.look(direction || 'down')

    if (velocity.x !== 0) {
      this._body.setVelocityX(this.speed * velocity.x)
      this._head.setVelocityX(this.speed * velocity.x)
    }

    if (velocity.y !== 0) {
      this._body.setVelocityY(this.speed * velocity.y)
      this._head.setVelocityY(this.speed * velocity.y)
    }
  }

  look(direction: Direction) {
    if (!this._head.anims.isPlaying) {
      this._head.setFrame(`${direction}shoot0.png`)
    }
  }

  shoot(direction: Direction) {
    if (direction !== 'idle') {
      if (this.scene.game.getTime() > this.tearCooldown) {
        this._head.anims.setTimeScale(this.SHOT_SPEED)
        this.tearSound.play()
        this.tears.fire(this._head.x, this._head.y, direction, this.SHOT_SPEED * 1000, this.RANGE)

        this.tearCooldown = this.scene.game.getTime() + (1 - this.SHOT_SPEED) * 1000
      }
    }

    this._head.play(`shoot_${direction}`, true)
  }
}
