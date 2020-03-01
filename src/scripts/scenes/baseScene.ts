export default class BaseScene extends Phaser.Scene {
  constructor({ key }) {
    super({ key })
  }

  get isMobile() {
    return this.game.device.os.iOS || this.game.device.os.android
  }
}
