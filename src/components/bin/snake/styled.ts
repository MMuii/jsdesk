import styled, { css } from 'styled-components';
import { Direction } from 'components/bin/snake/types';

const CHAR_WIDTH = 0.841;
const CHAR_HEIGHT = 1.89;

export const SnakeContiner = styled.div`
  display: flex;
`;

export const Playfield = styled.div<{ height: number; width: number }>`
  padding: ${CHAR_HEIGHT / 2}rem ${CHAR_WIDTH / 2}rem;
  margin: 0.4rem;
  border: 1px solid white;
  position: relative;

  ${({ height, width }) => css`
    width: calc(${width} * ${CHAR_WIDTH}rem);
    height: calc(${height} * ${CHAR_HEIGHT}rem);
  `}
`;

const cellPositionStyle = css<{ xPos: number; yPos: number }>`
  position: absolute;

  ${({ xPos, yPos }) => {
    return css`
      left: calc(${xPos * CHAR_WIDTH}rem + ${CHAR_WIDTH / 2}rem);
      top: calc(${yPos * CHAR_HEIGHT}rem + ${CHAR_HEIGHT / 2}rem);
    `;
  }}
`;

export const PlayerElement = styled.div<{ xPos: number; yPos: number; direction: Direction }>`
  ${cellPositionStyle};

  ${({ direction }) => {
    const getRotation = (direction: Direction) => {
      switch (direction) {
        case 'up':
          return -90;
        case 'right':
          return 0;
        case 'down':
          return 90;
        case 'left':
          return 180;
      }
    };

    return css`
      transform: rotate(${getRotation(direction)}deg);
    `;
  }};

  &:first-of-type {
    color: ${({ theme }) => theme.green};
  }
`;

export const PlayfieldCell = styled.pre<{
  xPos: number;
  yPos: number;
  stayOnTop?: boolean;
  transparent?: boolean;
}>`
  ${cellPositionStyle};
  color: ${({ theme }) => theme.red};

  ${({ theme, transparent, stayOnTop }) => css`
    background: ${transparent ? 'unset' : theme.background};
    z-index: ${stayOnTop ? 1000 : 'unset'};
  `}
`;

export const BottomTextContainer = styled.div<{ width: number }>`
  padding: 0 ${CHAR_WIDTH / 2}rem;
  margin: 0 0.4rem;
  display: flex;
  justify-content: space-between;

  ${({ width }) => css`
    max-width: calc(${width} * ${CHAR_WIDTH}rem);
  `}
`;

export const HighScoresContainer = styled.div`
  margin-left: calc(0.4rem + ${CHAR_WIDTH}rem);
`;
