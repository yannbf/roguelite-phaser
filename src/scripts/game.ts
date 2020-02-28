import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import MenuScene from './scenes/menuScene'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MenuScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  render: {
    pixelArt: true
  }
}

window.addEventListener('load', () => {
  new Phaser.Game(config)
})
