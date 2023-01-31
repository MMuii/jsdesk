import { useEffect } from 'react';
import {
  BottomTextContainer,
  HighScoresContainer,
  Playfield,
  PlayfieldCell,
  SnakeContiner,
} from 'components/bin/snake/styled';
import { Player } from 'components/bin/snake/Player';
import { useSnake } from 'components/bin/snake/useSnake';
import { MAP_HEIGHT, MAP_WIDTH } from 'components/bin/snake/utils';
import { RenderableProps } from 'interfaces/BinProps';

const gameOverStrings = [
  `   ___                                  `,
  `  / __|__ _ _ __  ___   _____ _____ _ _ `,
  ` | (_ / _\` | '  \\/ -_) / _ \\ V / -_) '_|`,
  `  \\___\\__,_|_|_|_\\___| \\___/\\_/\\___|_|  `,
];

export const Snake = ({ terminate, isFocused }: RenderableProps) => {
  const { snakeBody, moveDirection, applePosition, interval, gameStatus, score, highScores } =
    useSnake(isFocused);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    const handler = (e: KeyboardEvent) => {
      e.stopPropagation();

      switch (e.key) {
        case 'q': {
          document.removeEventListener('keydown', handler);

          if (interval.current) {
            clearInterval(interval.current);
          }

          setTimeout(() => {
            terminate();
          }, 0);
          break;
        }
      }
    };

    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, [terminate, isFocused]);

  const renderHighScores = () => {
    if (highScores.length === 0) {
      return (
        <div>
          You don't have any <br />
          high scores yet
        </div>
      );
    }

    const pad = highScores.some(({ score }) => score >= 100) ? 3 : 2;
    const highScoresElements = highScores
      .sort((a, b) => b.score - a.score)
      .map(({ date, score }) => {
        const scoreDate = new Date(date);
        const highScore = `${String(score).padStart(pad, ' ')} - ${scoreDate.toLocaleDateString(
          undefined,
          { day: '2-digit', month: '2-digit', year: 'numeric' },
        )}`;

        return <pre key={scoreDate.getTime()}>{highScore}</pre>;
      })
      .slice(0, 15);

    return (
      <HighScoresContainer>
        <div>High scores</div>
        <div>{'-'.repeat(13 + pad)}</div>
        {highScoresElements}
      </HighScoresContainer>
    );
  };

  const renderGameOverOverlay = () => {
    const gameOverOverlay = gameOverStrings.map((string, i) => (
      <PlayfieldCell xPos={9} yPos={4 + i} key={string} stayOnTop>
        {string}
      </PlayfieldCell>
    ));

    return (
      <>
        {gameOverOverlay}
        <PlayfieldCell xPos={10} yPos={5 + gameOverOverlay.length} stayOnTop>
          Your score was: {score}
        </PlayfieldCell>
        <PlayfieldCell xPos={31} yPos={5 + gameOverOverlay.length} stayOnTop>
          Press R to restart
        </PlayfieldCell>
      </>
    );
  };

  return (
    <>
      <SnakeContiner>
        <Playfield width={MAP_WIDTH} height={MAP_HEIGHT}>
          {gameStatus === 'gameOver' && renderGameOverOverlay()}
          <Player snakeBody={snakeBody} headDirection={moveDirection} />
          {gameStatus !== 'gameOver' && (
            <PlayfieldCell xPos={applePosition.xPos} yPos={applePosition.yPos}>
              @
            </PlayfieldCell>
          )}
        </Playfield>
        {renderHighScores()}
      </SnakeContiner>
      <BottomTextContainer width={MAP_WIDTH}>
        <div>Q - quit, R - restart, P - pause</div>
        <div>Score: {score}</div>
      </BottomTextContainer>
    </>
  );
};
