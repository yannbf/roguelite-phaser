import { SCENES, IMAGES, AUDIOS } from '../constants'

export class MenuScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image
  music: Phaser.Sound.BaseSound

  constructor() {
    super({ key: SCENES.MAIN_MENU })
  }

  create() {
    this.setupBackground()
    this.setupAudio()

    this.add
      .text(this.cameras.main.width - 15, 15, `Roguelite Phaser`, {
        color: '#FFFFFF',
        fontSize: 32,
        fontFamily: '"Upheaval"'
      })
      .setOrigin(1, 0)

    this.input.keyboard.once('keydown_SPACE', () => this.startGame())
    this.input.once('pointerdown', () => this.startGame())

    this.input.gamepad.once('connected', () => {
      this.input.gamepad.pad1.once('down', index => {
        // index of X button
        if (index === 0) {
          this.startGame()
        }
      })
    })
  }

  setupBackground() {
    this.background = this.add
      .sprite(0, 0, IMAGES.TITLE_BACKGROUND)
      .setOrigin(0)
      .setDepth(0)
    const scaleX = this.cameras.main.width / this.background.width
    const scaleY = this.cameras.main.height / this.background.height
    const scale = Math.max(scaleX, scaleY)
    this.background.setScale(scale).setScrollFactor(0)
  }

  setupAudio() {
    this.music = this.sound.add(AUDIOS.TITLE_THEME, { volume: 0.05, loop: true })
    this.music.play()
  }

  startGame() {
    // fade out music
    this.tweens.add({
      targets: this.music,
      volume: 0,
      duration: 500
    })

    // fade out background and start game
    this.tweens.add({
      targets: this.background,
      alpha: 0,
      duration: 1000,
      ease: 'Sine.easeInOut',
      callbackScope: this,
      onComplete: () => {
        // this.music.stop()
        this.scene.start(SCENES.MAIN)
      }
    })
  }
}
