import Phaser from 'phaser'

import { MainScene } from '@game/scenes'
import { CharacterMovement, Direction } from '@game/types'

type KeyboardInput = {
  up: Phaser.Input.Keyboard.Key
  down: Phaser.Input.Keyboard.Key
  left: Phaser.Input.Keyboard.Key
  right: Phaser.Input.Keyboard.Key
  shootUp: Phaser.Input.Keyboard.Key
  shootDown: Phaser.Input.Keyboard.Key
  shootLeft: Phaser.Input.Keyboard.Key
  shootRight: Phaser.Input.Keyboard.Key
}

export class Controller {
  movementJoystick: any
  shootJoystick: any
  keyboard: KeyboardInput

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
      this.keyboard = this.scene.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        shootUp: Phaser.Input.Keyboard.KeyCodes.UP,
        shootDown: Phaser.Input.Keyboard.KeyCodes.DOWN,
        shootLeft: Phaser.Input.Keyboard.KeyCodes.LEFT,
        shootRight: Phaser.Input.Keyboard.KeyCodes.RIGHT
      }) as KeyboardInput
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
    if (movement.shotDirection) {
      this.scene.onShoot(movement.shotDirection)
    }
  }

  getMobileInput(): CharacterMovement {
    let direction
    let shotDirection
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

    if (this.shootJoystick.force) {
      const forceMultiplier =
        this.shootJoystick.force < this.shootJoystick.radius ? this.shootJoystick.force / this.shootJoystick.radius : 1

      if (this.shootJoystick.right) {
        shotDirection = 'right'
      }
      if (this.shootJoystick.left) {
        shotDirection = 'left'
      }
      if (this.shootJoystick.up) {
        shotDirection = 'up'
      }
      if (this.shootJoystick.down) {
        shotDirection = 'down'
      }

      // subtle click on the joystick - means stop shooting
      if (forceMultiplier <= 0.3) {
        shotDirection = 'idle'
      }
    }

    return { direction, shotDirection, velocity }
  }

  getDesktopInput(): CharacterMovement {
    let direction
    let shotDirection
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

    if (this.keyboard.shootRight?.isDown === true) {
      shotDirection = 'right'
    } else if (this.keyboard.shootLeft?.isDown === true) {
      shotDirection = 'left'
    } else if (this.keyboard.shootUp?.isDown === true) {
      shotDirection = 'up'
    } else if (this.keyboard.shootDown?.isDown === true) {
      shotDirection = 'down'
    } else {
      shotDirection = 'idle'
    }

    return { direction, shotDirection, velocity }
  }

  getJoystickInput(): CharacterMovement {
    let direction
    let shotDirection: Direction = 'idle'
    let velocity = { x: 0, y: 0 }

    const pad = this.scene.input.gamepad.pad1
    const xAxis = pad.axes[0].getValue()
    const yAxis = pad.axes[1].getValue()
    const shootXAxis = pad.axes[2].getValue()
    const shootYAxis = pad.axes[3].getValue()

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

    if (shootXAxis > 0) {
      shotDirection = 'right'
    }
    if (shootXAxis < 0) {
      shotDirection = 'left'
    }
    if (shootYAxis < 0) {
      shotDirection = 'up'
    }
    if (shootYAxis > 0) {
      shotDirection = 'down'
    }

    velocity.x = xAxis
    velocity.y = yAxis

    return { direction, shotDirection, velocity }
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
