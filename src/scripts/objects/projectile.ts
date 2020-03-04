import { IMAGES } from '@game/constants'

class Tear extends Phaser.Physics.Arcade.Sprite {
  direction
  constructor(scene, x, y) {
    super(scene, x, y, IMAGES.TEAR)
  }

  fire(x, y, direction, speed) {
    let velocity = { x: 0, y: 0 }
    this.direction = direction
    this.setDepth(4)

    switch (direction) {
      case 'right':
        velocity.x = speed
        x += 30
        break
      case 'left':
        velocity.x = -speed
        x -= 30
        break
      case 'up':
        // should be under the player's head
        this.setDepth(1)
        velocity.y = -speed
        break
      case 'down':
        velocity.y = speed
        y += 30
        break
    }

    this.setActive(true)
    this.setVisible(true)

    this.body.reset(x, y)
    this.setVelocity(velocity.x, velocity.y)
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)

    let shouldBeDisabled

    switch (this.direction) {
      case 'right':
        shouldBeDisabled = this.x >= this.scene.cameras.main.width
        break
      case 'left':
        shouldBeDisabled = this.x <= -32
        break
      case 'up':
        shouldBeDisabled = this.y <= -32
        break
      case 'down':
        shouldBeDisabled = this.y >= this.scene.cameras.main.height
        break
    }

    if (shouldBeDisabled) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
}

export class Tears extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)

    this.createMultiple({
      frameQuantity: 15,
      key: IMAGES.TEAR,
      active: false,
      visible: false,
      classType: Tear,
      'setScale.x': 1.5,
      'setScale.y': 1.5
    })
  }

  fire(x, y, direction, speed) {
    // Recicle tears
    let tear = this.getFirstDead(false)

    if (tear) {
      tear.fire(x, y, direction, speed)
    }
  }
}
