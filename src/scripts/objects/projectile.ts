import { IMAGES } from '@game/constants'

class Tear extends Phaser.Physics.Arcade.Sprite {
  animating: boolean = false
  direction
  initialX: number
  initialY: number
  range: number
  constructor(scene, x, y) {
    super(scene, x, y, IMAGES.TEAR)
  }

  fire(x, y, direction, speed, range) {
    let velocity = { x: 0, y: 0 }
    this.direction = direction
    this.range = range
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

    this.initialX = x
    this.initialY = y
    this.body.reset(x, y)
    this.setVelocity(velocity.x, velocity.y)
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)

    let shouldBeDisabled

    switch (this.direction) {
      case 'right':
        shouldBeDisabled = this.x >= this.initialX + 800 * this.range || this.x >= this.scene.cameras.main.width
        break
      case 'left':
        shouldBeDisabled = this.x <= this.initialX - 800 * this.range || this.x <= -32
        break
      case 'up':
        shouldBeDisabled = this.y <= this.initialY - 800 * this.range || this.y <= -32
        break
      case 'down':
        shouldBeDisabled = this.y >= this.initialY + 800 * this.range || this.y >= this.scene.cameras.main.height
        break
    }

    if (this.body.onCollide) {
      console.log('collided')
    }

    if (shouldBeDisabled && !this.animating) {
      this.animating = true
      this.scene.tweens.add({
        targets: this,
        y: this.direction === 'up' || this.direction === 'down' ? this.y : this.y + 20,
        duration: 100,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          this.setActive(false)
          this.setVisible(false)
          this.animating = false
        },
      })
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
      'setScale.y': 1.5,
    })
  }

  fire(x, y, direction, speed, range) {
    // Recicle tears
    let tear = this.getFirstDead(false)

    if (tear) {
      tear.fire(x, y, direction, speed, range)
    }
  }
}
