import { SCENES, EVENTS, IMAGES } from '@game/constants'
import { FpsText } from '@game/objects'
import { createText } from '@game/util'

export class HUDScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  healthBar: Phaser.GameObjects.Text
  hp: number = 3
  gameScene: Phaser.Scene

  constructor() {
    super({ key: SCENES.HUD })
  }

  create() {
    this.gameScene = this.scene.get(SCENES.MAIN)
    this.createPauseScreen()
    this.setupTexts()
    this.setupEvents()
  }

  veil: Phaser.GameObjects.Graphics
  pauseText: Phaser.GameObjects.Text
  isPaused: boolean

  createPauseScreen() {
    const { width } = this.game.renderer
    const pauseBtn = this.add.image(width / 2, 50, IMAGES.PAUSE_BTN).setScale(0.3)
    pauseBtn.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, pauseBtn.width, pauseBtn.height),
      Phaser.Geom.Rectangle.Contains
    )

    pauseBtn.on('pointerdown', () => {
      this.pauseGame()
    })

    this.input.keyboard.on('keydown_ESC', () => {
      this.pauseGame()
    })

    this.scene.pause
  }

  pauseGame() {
    this.gameScene.scene.pause()
    this.scene.launch(SCENES.PAUSE)
  }

  update() {
    this.fpsText.update()
  }

  setupTexts() {
    //  Our Text object to display the Score
    this.fpsText = new FpsText(this)

    createText(this, { x: this.cameras.main.width - 15, y: 15, text: `Roguelite Phaser` }).setOrigin(1, 0)
    this.healthBar = createText(this, { x: 8, y: 35, text: '', color: '#ff3333' })
    this.setHP(this.hp)
  }

  setupEvents() {
    // Grab a reference to the Game Scene
    const gameScene = this.scene.get(SCENES.MAIN)

    // Listen for events from it
    // From mainScene you call it => this.events.emit(EVENTS.PLAYER.DECREASE_HP)
    gameScene.events.on(EVENTS.PLAYER.DECREASE_HP, () => this.setHP(this.hp - 1), this)
    gameScene.events.on(EVENTS.PLAYER.INCREASE_HP, () => this.setHP(this.hp + 1), this)
  }

  setHP(hp: number) {
    this.hp = hp
    this.healthBar.setText('♥'.repeat(hp))
  }
}
