export default class BaseScene extends Phaser.Scene {
  constructor({ key }) {
    super({ key })
  }

  get isMobile() {
    return this.game.device.os.iOS || this.game.device.os.android
  }

  createJoystick(options: any = {}, onUpdate = () => {}) {
    const { x, y, radius = 100, forceMin = 0 } = options
    const joystick = (this.plugins.get('rexVirtualJoystick') as any)
      .add(this.scene, {
        x,
        y,
        radius,
        forceMin,
        base: this.add.circle(0, 0, 100, 0x888888, 0.1),
        thumb: this.add.circle(0, 0, 50, 0xcccccc, 0.1)
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
