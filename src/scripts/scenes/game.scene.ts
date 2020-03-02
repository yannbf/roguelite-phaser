import { SCENES, AUDIOS } from '@game/constants'
import { CharacterSprite } from '@game/objects'
import { Controller } from '@game/system'
import { CharacterMovement, ControllableScene } from '@game/types'
import { BaseScene } from './base.scene'

export class MainScene extends BaseScene implements ControllableScene {
  controller: Controller
  player: CharacterSprite

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

  setupGameObjects() {
    const { height, width } = this.game.renderer

    this.player = new CharacterSprite(this, width / 2, height / 2, 'hooded', 26)
  }

  setupAudio() {
    this.sound.play(AUDIOS.CAVES_THEME, { volume: 0.05, loop: true })
    this.sound.pauseOnBlur = false
  }
}
