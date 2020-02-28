import { SCENES, AUDIOS, IMAGES } from '../constants'

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.LOAD })
  }

  loadAudio() {
    this.load.setPath('assets/audio')
    Object.values(AUDIOS).forEach(audio => this.load.audio(audio, audio))
  }

  loadImages() {
    this.load.setPath('assets/img')
    Object.values(IMAGES).forEach(image => this.load.image(image, image))
  }

  preload() {
    this.loadAudio()
    this.loadImages()
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0x000000
      }
    })

    // Draws a progress bar in the middle of the screen while loading
    this.load.on('progress', percent => {
      const { height, width } = this.game.renderer
      this.game.renderer
      loadingBar.fillRect(0, height / 2, width * percent, 50)
    })
  }

  create() {
    this.sound.pauseOnBlur = false
    this.scene.start(SCENES.MAIN_MENU)
    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
