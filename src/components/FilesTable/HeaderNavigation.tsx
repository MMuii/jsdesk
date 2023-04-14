import { useEffect } from 'react';
import { Path } from 'interfaces/fs';
import useUndo from 'use-undo';
import { HiFolderPlus } from 'react-icons/hi2';
import { CurrentDirHeaderButtonsWrapper, CurrentDirHeaderContainer, NavArrow } from './styled';

interface Props {
  location: Path;
  changeDirectory: (pathString: string | Path) => string | void;
  makeDirectory: () => void;
}

export const HeaderNavigation = ({ location, changeDirectory, makeDirectory }: Props) => {
  const [currentLocation, { set, undo, redo, canRedo, canUndo }] = useUndo(location);

  useEffect(() => {
    set(location);
  }, [location, set]);

  const undoLocation = () => {
    changeDirectory(currentLocation.past.at(-1) as Path);
    undo();
  };

  const redoLocation = () => {
    changeDirectory(currentLocation.future.at(0) as Path);
    redo();
  };

  const displayedLocation = location.at(-1) === '/' ? 'desktop' : location.at(-1);

  return (
    <CurrentDirHeaderContainer>
      <CurrentDirHeaderButtonsWrapper>
        <div>
          <NavArrow onClick={undoLocation} $enabled={canUndo} />
          <NavArrow
            onClick={redoLocation}
            $enabled={canRedo}
            style={{ transform: 'rotate(180deg)' }}
          />
        </div>
        <span>{displayedLocation}</span>
      </CurrentDirHeaderButtonsWrapper>
      <CurrentDirHeaderButtonsWrapper>
        <HiFolderPlus
          style={{ fontSize: '2.2rem', padding: '0.3rem 0.5rem' }}
          onClick={makeDirectory}
        />
      </CurrentDirHeaderButtonsWrapper>
    </CurrentDirHeaderContainer>
  );
};
