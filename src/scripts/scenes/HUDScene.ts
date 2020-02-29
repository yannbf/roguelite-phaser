import FpsText from '../objects/fpsText'
import { SCENES, EVENTS } from '../constants'

export default class HUDScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  healthBar: Phaser.GameObjects.Text
  hp: number = 3

  constructor() {
    super({ key: SCENES.HUD })
  }

  create() {
    this.setupTexts()
    this.setupEvents()
  }

  update() {
    this.fpsText.update()
  }

  setupTexts() {
    //  Our Text object to display the Score
    this.fpsText = new FpsText(this)

    this.createText(this.cameras.main.width - 15, 15, `Roguelite Phaser`).setOrigin(1, 0)
    this.healthBar = this.createText(8, 35, '', '#ff3333')
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

  createText(x: number, y: number, text: string, color = '#000000') {
    return this.add.text(x, y, text, {
      color,
      fontSize: 32,
      fontFamily: '"Upheaval"'
    })
  }

  setHP(hp: number) {
    this.hp = hp
    this.healthBar.setText('♥'.repeat(hp))
  }
}
