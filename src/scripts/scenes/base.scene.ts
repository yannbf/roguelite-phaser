export class BaseScene extends Phaser.Scene {
  constructor({ key }) {
    super({ key })
  }

  get isMobile() {
    return this.game.device.os.iOS || this.game.device.os.android
  }

  get mainCamera() {
    return this.cameras.main
  }

  get halfWidth() {
    return this.mainCamera.width / 2
  }

  get halfHeight() {
    return this.mainCamera.height / 2
  }

  get width() {
    return this.mainCamera.width
  }

  get height() {
    return this.mainCamera.height
  }
}
