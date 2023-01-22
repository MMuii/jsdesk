import { Direction, SnakeBodyElement } from 'components/bin/snake/types';

export const MAP_WIDTH = 60;
export const MAP_HEIGHT = 16;
export const INTERVAL_TICK = 100;

export const getRelativeDirection = (
  prevEl: SnakeBodyElement,
  curEl: SnakeBodyElement,
): Direction | undefined => {
  if (!prevEl) {
    return undefined;
  }

  if (curEl.yPos < prevEl.yPos) {
    return 'down';
  } else if (curEl.yPos > prevEl.yPos) {
    return 'up';
  } else if (curEl.xPos < prevEl.xPos) {
    return 'right';
  } else {
    return 'left';
  }
};
