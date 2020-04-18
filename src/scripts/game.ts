import 'phaser'
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js'

import { MainScene, PreloadScene, MenuScene, HUDScene, PauseScene } from './scenes'

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
  scene: [PreloadScene, MenuScene, MainScene, HUDScene, PauseScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug,
      gravity: { y: 0 }
    }
  },
  render: {
    pixelArt: true
  },
  input: {
    activePointers: 3,
    gamepad: true
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
