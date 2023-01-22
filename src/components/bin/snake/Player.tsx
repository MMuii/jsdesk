import { PlayerElement } from 'components/bin/snake/styled';
import { Direction, SnakeBodyElement } from 'components/bin/snake/types';
import { getRelativeDirection } from 'components/bin/snake/utils';

interface Props {
  snakeBody: SnakeBodyElement[];
  headDirection: Direction;
}

export const Player = ({ snakeBody, headDirection }: Props) => {
  const renderBody = () => {
    return snakeBody.map((el, i) => {
      const char = i === 0 ? '>' : '~';
      const relativeDirection = getRelativeDirection(snakeBody[i - 1], el) ?? headDirection;

      return (
        <PlayerElement
          key={`${el.xPos}${el.yPos}${relativeDirection}`}
          xPos={el.xPos}
          yPos={el.yPos}
          direction={relativeDirection}
        >
          {char}
        </PlayerElement>
      );
    });
  };

  return <>{renderBody()}</>;
};
