export type TextOptions = {
  x: number
  y: number
  text: string
  color?: string
}

export type InteractiveTextOptions = TextOptions & {
  callback: () => void
}

export const createText = (scene: Phaser.Scene, options: TextOptions) => {
  const { x, y, text, color = '#000000' } = options

  return scene.add
    .text(x, y, text, {
      color,
      fontSize: 32,
      fontFamily: '"Upheaval"',
    })
    .setDepth(10)
}

export const createInteractiveText = (scene: Phaser.Scene, options: InteractiveTextOptions) => {
  const { callback = () => {} } = options

  const textElement = createText(scene, options)

  textElement.setInteractive(
    new Phaser.Geom.Rectangle(0, 0, textElement.width, textElement.height),
    Phaser.Geom.Rectangle.Contains
  )

  textElement.on('pointerdown', () => {
    callback()
  })

  return textElement
}
