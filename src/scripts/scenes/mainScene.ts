import { SCENES, AUDIOS } from '../constants'
import CharacterSprite from '../objects/character'
import BaseScene from './baseScene'

export default class MainScene extends BaseScene {
  PLAYER_SPEED = 128
  character: Phaser.GameObjects.Image
  player: CharacterSprite
  keyboard: Phaser.Types.Input.Keyboard.CursorKeys
  movementJoystick: any
  shootJoystick: any

  constructor() {
    super({ key: SCENES.MAIN })
  }

  // Phaser lifecycle hooks
  preload() {
    this.textures.addSpriteSheetFromAtlas('hooded', {
      frameHeight: 64,
      frameWidth: 64,
      atlas: 'characters',
      frame: 'hooded'
    })

    this.anims.create({
      key: 'up',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('hooded', {
        start: 105,
        end: 112
      })
    })

    this.anims.create({
      key: 'left',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('hooded', {
        start: 118,
        end: 124
      })
    })

    this.anims.create({
      key: 'down',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('hooded', {
        start: 130,
        end: 138
      })
    })

    this.anims.create({
      key: 'right',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('hooded', {
        start: 143,
        end: 151
      })
    })
  }

  create() {
    this.setupGameObjects()
    this.setupAudio()
    this.setupInput()
  }

  update() {
    if (this.input.gamepad.total && this.input.gamepad.pad1?.connected) {
      this.handleJoystickInput()
    } else if (this.isMobile) {
      this.handleMobileInput()
    } else {
      this.handleDesktopInput()
    }
  }

  // Custom methods
  setupGameObjects() {
    const { height, width } = this.game.renderer

    this.player = new CharacterSprite(this, width / 2, height / 2, 'hooded', 26)
  }

  setupAudio() {
    this.sound.play(AUDIOS.CAVES_THEME, { volume: 0.05, loop: true })
    this.sound.pauseOnBlur = false
  }

  setupInput() {
    if (this.isMobile) {
      // Create movement joystick
      const movementJoystickOpts = {
        x: 125,
        y: this.cameras.main.height - 125
      }
      this.movementJoystick = this.createJoystick(movementJoystickOpts)

      // Create shooting joystick
      const shootJoystickOpts = {
        x: this.cameras.main.width - 125,
        y: this.cameras.main.height - 125
      }
      this.shootJoystick = this.createJoystick(shootJoystickOpts)
    } else {
      this.keyboard = this.input.keyboard.createCursorKeys()
    }
  }

  handleMobileInput() {
    if (this.movementJoystick.force) {
      // Calculate speed based on joystick force
      const speedMultiplier =
        this.movementJoystick.force < this.movementJoystick.radius
          ? this.movementJoystick.force / this.movementJoystick.radius
          : 1
      const speed = this.player.SPEED * speedMultiplier

      if (this.movementJoystick.right) {
        this.player.walk('right')
      }
      if (this.movementJoystick.left) {
        this.player.walk('left')
      }
      if (this.movementJoystick.up) {
        this.player.walk('up')
      }
      if (this.movementJoystick.down) {
        this.player.walk('down')
      }
      // Move player according to movement joystick
      this.player.setVelocityX(speed * Math.cos((Math.PI * this.movementJoystick.angle) / 180))
      this.player.setVelocityY(speed * Math.sin((Math.PI * this.movementJoystick.angle) / 180))
    } else {
      // Stop moving
      this.player.setVelocity(0, 0)
    }
  }

  handleDesktopInput() {
    if (this.keyboard.right?.isDown === true) {
      this.player.walk('right')
    }
    if (this.keyboard.left?.isDown === true) {
      this.player.walk('left')
    }
    if (this.keyboard.up?.isDown === true) {
      this.player.walk('up')
    }
    if (this.keyboard.down?.isDown === true) {
      this.player.walk('down')
    }

    // Stop moving
    if (this.keyboard.left?.isUp && this.keyboard.right?.isUp) {
      this.player.setVelocityX(0)
    }

    if (this.keyboard.up?.isUp && this.keyboard.down?.isUp) {
      this.player.setVelocityY(0)
    }
  }

  handleJoystickInput() {
    const pad = this.input.gamepad.pad1

    const xAxis = pad.axes[0].getValue()
    const yAxis = pad.axes[1].getValue()

    if (xAxis > 0) {
      this.player.walk('right')
    }
    if (xAxis < 0) {
      this.player.walk('left')
    }
    if (yAxis < 0) {
      this.player.walk('up')
    }
    if (yAxis > 0) {
      this.player.walk('down')
    }

    this.player.setVelocity(this.player.SPEED * xAxis, this.player.SPEED * yAxis)

    if (xAxis === 0 && yAxis === 0) {
      this.player.setVelocity(0, 0)
    }
  }
}
