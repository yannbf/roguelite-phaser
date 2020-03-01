import Phaser from 'phaser'

import MainScene from '../scenes/mainScene'
import { CharacterMovement } from '../types'

export default class Controller {
  movementJoystick: any
  shootJoystick: any
  keyboard: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(public scene: MainScene) {
    this.init()
  }

  init() {
    if (this.scene.isMobile) {
      // Create movement joystick
      const movementJoystickOpts = {
        x: 125,
        y: this.scene.cameras.main.height - 125
      }
      this.movementJoystick = this.createVirtualJoystick(movementJoystickOpts)

      // Create shooting joystick
      const shootJoystickOpts = {
        x: this.scene.cameras.main.width - 125,
        y: this.scene.cameras.main.height - 125
      }
      this.shootJoystick = this.createVirtualJoystick(shootJoystickOpts)
    } else {
      this.keyboard = this.scene.input.keyboard.createCursorKeys()
    }
  }

  update() {
    let movement: CharacterMovement
    if (this.scene.input.gamepad.total && this.scene.input.gamepad.pad1?.connected) {
      movement = this.getJoystickInput()
    } else if (this.scene.isMobile) {
      movement = this.getMobileInput()
    } else {
      movement = this.getDesktopInput()
    }

    this.scene.onMove(movement)
  }

  getMobileInput(): CharacterMovement {
    let direction
    let velocity = { x: 0, y: 0 }

    if (this.movementJoystick.force) {
      // Calculate speed based on joystick force
      const speedMultiplier =
        this.movementJoystick.force < this.movementJoystick.radius
          ? this.movementJoystick.force / this.movementJoystick.radius
          : 1

      if (this.movementJoystick.right) {
        direction = 'right'
      }
      if (this.movementJoystick.left) {
        direction = 'left'
      }
      if (this.movementJoystick.up) {
        direction = 'up'
      }
      if (this.movementJoystick.down) {
        direction = 'down'
      }
      // Move player according to movement joystick
      velocity.x = speedMultiplier * Math.cos((Math.PI * this.movementJoystick.angle) / 180)
      velocity.y = speedMultiplier * Math.sin((Math.PI * this.movementJoystick.angle) / 180)
    }

    return { direction, velocity }
  }

  getDesktopInput(): CharacterMovement {
    let direction
    let velocity = { x: 0, y: 0 }

    if (this.keyboard.right?.isDown === true) {
      direction = 'right'
      velocity.x = 1
    }
    if (this.keyboard.left?.isDown === true) {
      direction = 'left'
      velocity.x = -1
    }
    if (this.keyboard.up?.isDown === true) {
      direction = 'up'
      velocity.y = -1
    }
    if (this.keyboard.down?.isDown === true) {
      direction = 'down'
      velocity.y = 1
    }
    // Stop moving
    if (this.keyboard.left?.isUp && this.keyboard.right?.isUp) {
      velocity.x = 0
    }
    if (this.keyboard.up?.isUp && this.keyboard.down?.isUp) {
      velocity.y = 0
    }

    return { direction, velocity }
  }

  getJoystickInput(): CharacterMovement {
    let direction
    let velocity = { x: 0, y: 0 }

    const pad = this.scene.input.gamepad.pad1
    const xAxis = pad.axes[0].getValue()
    const yAxis = pad.axes[1].getValue()

    if (xAxis > 0) {
      direction = 'right'
    }
    if (xAxis < 0) {
      direction = 'left'
    }
    if (yAxis < 0) {
      direction = 'up'
    }
    if (yAxis > 0) {
      direction = 'down'
    }

    velocity.x = xAxis
    velocity.y = yAxis

    return { direction, velocity }
  }

  createVirtualJoystick(options: any = {}, onUpdate = () => {}) {
    const { x, y, radius = 100, forceMin = 0 } = options
    const joystick = (this.scene.plugins.get('rexVirtualJoystick') as any)
      .add(this.scene, {
        x,
        y,
        radius,
        forceMin,
        base: this.scene.add.circle(0, 0, 100, 0x888888, 0.1),
        thumb: this.scene.add.circle(0, 0, 50, 0xcccccc, 0.1)
      })
      .on('update', () => {
        if (joystick.noKey) {
          joystick.base.fillAlpha = 0.1
          joystick.thumb.fillAlpha = 0.1
        } else {
          joystick.base.fillAlpha = 0.6
          joystick.thumb.fillAlpha = 0.6
        }
        onUpdate()
      })

    return joystick
  }
}
