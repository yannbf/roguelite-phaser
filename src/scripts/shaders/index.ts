import vignetteFrag from './vignette.glsl'

export class Shader extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
  constructor(game: Phaser.Game, fragShader) {
    super({ game, renderer: game.renderer, fragShader })
  }
}

export class VignetteShader extends Shader {
  constructor(game: Phaser.Game, width, height) {
    super(game, vignetteFrag)
    // set the uniform defined in the .glsl file
    this.setFloat2('resolution', width, height)
  }
}
