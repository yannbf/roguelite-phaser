import { SCENES } from '@game/constants'
import { createInteractiveText } from '@game/util'

export class PauseScene extends Phaser.Scene {
  gameScene: Phaser.Scene
  veil: Phaser.GameObjects.Graphics
  resumeText: Phaser.GameObjects.Text
  exitText: Phaser.GameObjects.Text
  isPaused: boolean

  constructor() {
    super({ key: SCENES.PAUSE })
  }

  create() {
    this.gameScene = this.scene.get(SCENES.MAIN)
    this.createPauseScreen()
  }

  createPauseScreen() {
    const { height, width } = this.game.renderer

    this.resumeText = createInteractiveText(this, {
      x: width / 2,
      y: height / 2,
      text: 'Resume',
      color: '#ffffff',
      callback: () => this.pauseResume(),
    }).setScrollFactor(0)

    this.veil = this.add
      .graphics({ x: 0, y: 0, fillStyle: { color: 0x000000, alpha: 0.2 } })
      .fillRect(0, 0, width, height)
      .setScrollFactor(0)

    this.exitText = createInteractiveText(this, {
      x: width / 2,
      y: height / 2 + 30,
      text: 'Exit',
      color: '#ffffff',
      callback: () => this.exitToMainMenu(),
    }).setScrollFactor(0)

    this.togglePauseScreen(true)
  }

  togglePauseScreen(isVisible) {
    this.isPaused = isVisible
    this.veil.setVisible(isVisible)
    this.resumeText.setVisible(isVisible)
    this.exitText.setVisible(isVisible)

    this.tweens.add({
      targets: this.veil,
      alpha: isVisible ? 1 : 0,
      duration: 500,
      ease: 'Sine.easeInOut',
      callbackScope: this,
    })
  }

  pauseResume() {
    if (this.isPaused) {
      this.togglePauseScreen(false)
      this.gameScene.scene.resume()
    } else {
      this.togglePauseScreen(true)
      this.gameScene.scene.pause()
    }
  }

  exitToMainMenu() {
    // TODO: make a workable switch to main menu
    console.log('exit to main menu')
    // this.scene.launch(SCENES.MAIN_MENU)
  }
}
