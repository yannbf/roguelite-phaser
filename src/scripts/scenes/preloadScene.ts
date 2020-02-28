import { SCENES } from '../constants'

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.LOAD })
  }

  preload() {
    this.load.audio('title-theme', 'assets/audio/title-theme.mp3')
    this.load.audio('caves-theme', 'assets/audio/caves-theme.mp3')
    this.load.image('title-bg', 'assets/img/start-screen.jpg')
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')

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
