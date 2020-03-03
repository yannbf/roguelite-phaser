export type Direction = 'idle' | 'right' | 'left' | 'down' | 'up'
export type CharacterMovement = {
  direction: Direction
  shotDirection?: Direction
  velocity: {
    x: number
    y: number
  }
}

export interface ControllableScene {
  onMove(movement: CharacterMovement): void
  onShoot(direction: Direction): void
}
