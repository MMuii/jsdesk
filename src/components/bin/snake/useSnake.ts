import { HighScore } from './types';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import { INTERVAL_TICK } from './utils';
import { useEffect, useRef, useState } from 'react';
import {
  ControlKey,
  Coords,
  Direction,
  GameState,
  keyDirectionMap,
  SnakeBodyElement,
} from 'components/bin/snake/types';
import { getRelativeDirection, MAP_HEIGHT, MAP_WIDTH } from 'components/bin/snake/utils';

const initialSnakeBody = [
  { xPos: 10, yPos: 8 },
  { xPos: 9, yPos: 8 },
  { xPos: 8, yPos: 8 },
];

const getNewPlayerDirection = (key: ControlKey, lastMovedDirection: Direction): Direction => {
  if (
    (lastMovedDirection === 'up' && key === 's') ||
    (lastMovedDirection === 'down' && key === 'w') ||
    (lastMovedDirection === 'left' && key === 'd') ||
    (lastMovedDirection === 'right' && key === 'a')
  ) {
    return lastMovedDirection;
  }

  return keyDirectionMap[key];
};

const getNewHeadPosition = (head: SnakeBodyElement, direction: Direction): SnakeBodyElement => {
  switch (direction) {
    case 'up': {
      const newY = head.yPos === 0 ? MAP_HEIGHT - 1 : head.yPos - 1;
      return { xPos: head.xPos, yPos: newY };
    }
    case 'left': {
      const newX = head.xPos === 0 ? MAP_WIDTH - 1 : head.xPos - 1;
      return { xPos: newX, yPos: head.yPos };
    }
    case 'down': {
      const newY = head.yPos === MAP_HEIGHT - 2 ? 0 : head.yPos + 1;
      return { xPos: head.xPos, yPos: newY };
    }
    case 'right': {
      const newX = head.xPos === MAP_WIDTH - 2 ? 0 : head.xPos + 1;
      return { xPos: newX, yPos: head.yPos };
    }
  }
};

const getMovedSnakeBody = (
  snakeBody: SnakeBodyElement[],
  direction: Direction,
): SnakeBodyElement[] => {
  const newHeadPosition = getNewHeadPosition(snakeBody[0], direction);
  if (snakeBody.length === 1) {
    return [newHeadPosition];
  }

  return [
    newHeadPosition,
    ...snakeBody.slice(1).map((bodyEl, i) => {
      return {
        xPos: snakeBody[i].xPos,
        yPos: snakeBody[i].yPos,
      };
    }),
  ];
};

const getAppendedBodyElementPosition = (
  lastEl: SnakeBodyElement,
  direction: Direction,
): SnakeBodyElement => {
  switch (direction) {
    case 'up': {
      const newY = lastEl.yPos === MAP_HEIGHT - 1 ? 0 : lastEl.yPos + 1;
      return { xPos: lastEl.xPos, yPos: newY };
    }
    case 'left': {
      const newX = lastEl.xPos === MAP_WIDTH - 1 ? 0 : lastEl.xPos + 1;
      return { xPos: newX, yPos: lastEl.yPos };
    }
    case 'down': {
      const newY = lastEl.yPos === 0 ? MAP_HEIGHT - 1 : lastEl.yPos - 1;
      return { xPos: lastEl.xPos, yPos: newY };
    }
    case 'right': {
      const newX = lastEl.xPos === 0 ? MAP_WIDTH - 1 : lastEl.xPos - 1;
      return { xPos: newX, yPos: lastEl.yPos };
    }
  }
};

const isCellFree = (coords: Coords, snakeBody: SnakeBodyElement[], apple: Coords) => {
  if (snakeBody.some(bodyEl => bodyEl.xPos === coords.xPos && bodyEl.yPos === coords.yPos)) {
    return false;
  }

  if (coords.xPos === apple.xPos && coords.yPos === apple.yPos) {
    return false;
  }

  return true;
};

const getRandomFreeCell = (snakeBody: SnakeBodyElement[], apple: Coords): Coords => {
  let freeCoords: Coords = { xPos: 0, yPos: 0 };

  do {
    freeCoords.xPos = Math.floor(Math.random() * MAP_WIDTH);
    freeCoords.yPos = Math.floor(Math.random() * MAP_HEIGHT);
  } while (!isCellFree(freeCoords, snakeBody, apple));

  return freeCoords;
};

export const useSnake = (isFocused: boolean) => {
  const [snakeBody, setSnakeBody] = useState<SnakeBodyElement[]>(initialSnakeBody);
  const [applePosition, setApplePosition] = useState<Coords>(
    getRandomFreeCell(snakeBody, { xPos: -1, yPos: -1 }),
  );
  const [gameStatus, setGameStatus] = useState<GameState>('playing');
  const [score, setScore] = useState<number>(0);
  const [highScores, setHighScores] = useLocalStorage<HighScore[]>('snakeHighScores', []);
  const lastActuallyMovedDirection = useRef<Direction>('right');
  const moveDirection = useRef<Direction>('right');
  const interval = useRef<null | NodeJS.Timer>(null);

  const onIntervalTick = () => {
    setSnakeBody(prev => getMovedSnakeBody(prev, moveDirection.current));
    lastActuallyMovedDirection.current = moveDirection.current;
  };

  const onGameRestart = () => {
    setSnakeBody(initialSnakeBody);
    setApplePosition(getRandomFreeCell(snakeBody, { xPos: -1, yPos: -1 }));
    setScore(0);
    moveDirection.current = 'right';
    setGameStatus('playing');
  };

  const onGamePause = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
    setGameStatus('paused');
  };

  const onGameResume = () => {
    interval.current = setInterval(() => {
      onIntervalTick();
    }, INTERVAL_TICK);
    setGameStatus('playing');
  };

  const handleInput = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'w':
      case 'a':
      case 's':
      case 'd':
      case 'ArrowUp':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowLeft': {
        moveDirection.current = getNewPlayerDirection(
          e.key as ControlKey,
          lastActuallyMovedDirection.current,
        );
        break;
      }
      case 'r': {
        onGameRestart();
        break;
      }
      case 'p': {
        if (gameStatus === 'playing') {
          onGamePause();
        } else if (gameStatus === 'paused') {
          onGameResume();
        }
        break;
      }
    }
  };

  // detecting collisions
  useEffect(() => {
    // collision with apple
    if (snakeBody[0].xPos === applePosition.xPos && snakeBody[0].yPos === applePosition.yPos) {
      const lastSnakeBodyElDirection = getRelativeDirection(
        snakeBody[snakeBody.length - 2],
        snakeBody[snakeBody.length - 1],
      );

      setSnakeBody(prev => [
        ...prev,
        getAppendedBodyElementPosition(
          snakeBody[snakeBody.length - 1],
          lastSnakeBodyElDirection as Direction,
        ),
      ]);

      setApplePosition(prev => getRandomFreeCell(snakeBody, prev));
      setScore(prev => prev + 1);
    }

    // collision with itself
    // prettier-ignore
    const hasDuplicatedPositions = new Set(snakeBody.map(bodyEl => Object.entries(bodyEl).flat().join('|'))).size < snakeBody.length;
    if (hasDuplicatedPositions) {
      setGameStatus('gameOver');
      setHighScores(prev => [...prev, { date: new Date().toISOString(), score }]);
    }
  }, [applePosition.xPos, applePosition.yPos, snakeBody]);

  // handling timer according to current game status and handling user input
  useEffect(() => {
    if (!isFocused) {
      return;
    }

    document.addEventListener('keydown', handleInput);

    if (gameStatus === 'paused' || gameStatus === 'gameOver') {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    }

    if (gameStatus === 'playing') {
      if (!interval.current) {
        interval.current = setInterval(() => {
          onIntervalTick();
        }, INTERVAL_TICK);
      }
    }

    return () => {
      document.removeEventListener('keydown', handleInput);

      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [gameStatus, isFocused]);

  return {
    snakeBody,
    moveDirection: moveDirection.current,
    applePosition,
    interval,
    gameStatus,
    score,
    highScores,
  };
};
