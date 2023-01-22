export type Direction = 'up' | 'right' | 'down' | 'left';

export type ControlKey =
  | 'w'
  | 'a'
  | 's'
  | 'd'
  | 'ArrowUp'
  | 'ArrowRight'
  | 'ArrowDown'
  | 'ArrowLeft';

export type GameState = 'playing' | 'paused' | 'gameOver';

export interface HighScore {
  date: string;
  score: number;
}

export const keyDirectionMap: Record<ControlKey, Direction> = {
  w: 'up',
  ArrowUp: 'up',
  a: 'left',
  ArrowLeft: 'left',
  s: 'down',
  ArrowDown: 'down',
  d: 'right',
  ArrowRight: 'right',
};

export interface Coords {
  xPos: number;
  yPos: number;
}

export type SnakeBodyElement = Coords;
