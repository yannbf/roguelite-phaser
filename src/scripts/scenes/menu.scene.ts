import { SCENES, IMAGES, AUDIOS } from '@game/constants'
import { BaseScene } from './base.scene'

export class MenuScene extends BaseScene {
  logo: Phaser.GameObjects.Sprite
  startAnimation: Phaser.GameObjects.Sprite
  background: Phaser.GameObjects.Sprite
  shadowOverlay: Phaser.GameObjects.Image
  music: Phaser.Sound.BaseSound

  constructor() {
    super({ key: SCENES.MAIN_MENU })
  }

  preload() {
    this.setupAnimations()
  }

  create() {
    this.setupSprites()
    this.setupTexts()
    this.setupAudio()
    this.handleInput()
  }

  handleInput() {
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

  setupAnimations() {
    this.anims.create({
      key: 'blink-start',
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNames('title-screen', {
        prefix: 'title_start',
        suffix: '.png',
        start: 0,
        end: 1
      })
    })
  }

  setupSprites() {
    this.background = this.add
      .sprite(0, 0, 'title-screen', 'menu_background.png')
      .setOrigin(0)
      .setDepth(0)

    const scaleX = this.width / this.background.width
    const scaleY = this.height / this.background.height
    const scale = Math.max(scaleX, scaleY)
    this.background.setScale(scale)

    this.shadowOverlay = this.add
      .image(-40, this.halfHeight, IMAGES.TITLE_SHADOW)
      .setOrigin(0)
      .setDepth(1)
      .setScale(2.5)

    this.logo = this.add.sprite(this.halfWidth, this.height * 0.2, 'title-screen', 'menu_logo.png').setScale(2.5)

    this.tweens.add({
      targets: this.logo,
      duration: 800,
      yoyo: true,
      angle: 2,
      repeat: -1
    })

    this.startAnimation = this.add
      .sprite(this.halfWidth, this.height * 0.55, 'title-screen', 'title_start0.png')
      .setScale(2.5)

    this.startAnimation.play('blink-start')
  }

  setupTexts() {
    this.add
      .text(this.width - 15, this.height - 40, `Roguelite Phaser`, {
        color: '#FFFFFF',
        fontSize: 32,
        fontFamily: '"Upheaval"'
      })
      .setOrigin(1, 0)
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

    this.mainCamera.once('camerafadeoutcomplete', () => {
      this.scene.start(SCENES.HUD)
      this.scene.start(SCENES.MAIN)
    })

    this.mainCamera.fadeOut()
  }
}
