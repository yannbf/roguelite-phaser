export type CharacterMovement = {
  direction: undefined | 'right' | 'left' | 'down' | 'up'
  velocity: {
    x: number
    y: number
  }
}

export interface ControllableScene {
  onMove(movement: CharacterMovement): void
}
