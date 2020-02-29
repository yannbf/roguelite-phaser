import 'phaser'
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import MenuScene from './scenes/menuScene'
import HUDScene from './scenes/HUDScene'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const urlParams = new URLSearchParams(window.location.search)
const debug = urlParams.get('debug') === 'true'

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
  scene: [PreloadScene, HUDScene, MenuScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug
    }
  },
  render: {
    pixelArt: true
  },
  input: {
    activePointers: 3
  },
  plugins: {
    global: [
      {
        key: 'rexVirtualJoystick',
        plugin: VirtualJoystickPlugin,
        start: true
      }
    ]
  }
}

window.addEventListener('load', () => {
  new Phaser.Game(config)
})
