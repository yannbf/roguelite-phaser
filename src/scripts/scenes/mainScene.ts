import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import { SCENES, AUDIOS } from '../constants'

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  character: Phaser.GameObjects.Image

  constructor() {
    super({ key: SCENES.MAIN })
  }

  create() {
    this.character = new PhaserLogo(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this)
    this.setupAudio()

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Roguelite Phaser`, {
        color: '#000000',
        fontSize: 32,
        fontFamily: '"Upheaval"'
      })
      .setOrigin(1, 0)
  }

  update() {
    this.fpsText.update()
  }

  setupAudio() {
    this.sound.play(AUDIOS.CAVES_THEME, { volume: 0.05, loop: true })
    this.sound.pauseOnBlur = false
  }
}
