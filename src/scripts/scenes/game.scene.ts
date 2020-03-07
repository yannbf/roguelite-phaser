import { SCENES, AUDIOS, IMAGES } from '@game/constants'
import { Player } from '@game/objects'
import { Controller } from '@game/system'
import { CharacterMovement, ControllableScene, Direction } from '@game/types'
import { BaseScene } from './base.scene'

export class MainScene extends BaseScene implements ControllableScene {
  controller: Controller
  player: Player

  constructor() {
    super({ key: SCENES.MAIN })
  }

  // Phaser lifecycle hooks
  preload() {
    this.textures.addSpriteSheetFromAtlas('hooded', {
      frameHeight: 64,
      frameWidth: 64,
      atlas: 'characters',
      frame: 'hooded'
    })
  }

  init() {
    this.mainCamera.fadeIn()
  }

  create() {
    this.setupGameObjects()
    this.setupAudio()

    this.controller = new Controller(this)
  }

  update() {
    this.controller.update()
  }

  // Custom methods
  onMove(movement: CharacterMovement) {
    this.player.walk(movement)
  }

  onShoot(direction: Direction) {
    this.player.shoot(direction)
  }

  setupGameObjects() {
    // TODO: only show this in the very first floor, very first room
    this.add.image(this.halfWidth, this.halfHeight, IMAGES.BG_CONTROLS).setScale(3)
    this.player = new Player(this)
  }

  setupAudio() {
    this.sound.play(AUDIOS.CAVES_THEME, { volume: 0.05, loop: true })
    this.sound.pauseOnBlur = false
  }
}
