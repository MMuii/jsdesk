import { useEffect } from 'react';
import { Path } from 'interfaces/fs';
import useUndo from 'use-undo';
import { HiFolderPlus } from 'react-icons/hi2';
import { CurrentDirHeaderButtonsWrapper, CurrentDirHeaderContainer, NavArrow } from './styled';

interface Props {
  location: Path;
  changeDirectoryAbsolute: (pathString: string | Path) => string | null;
  makeDirectory: () => void;
}

export const HeaderNavigation = ({ location, changeDirectoryAbsolute, makeDirectory }: Props) => {
  const [currentLocation, { set, undo, redo, canRedo, canUndo }] = useUndo(location);

  useEffect(() => {
    set(location);
  }, [location, set]);

  const undoLocation = () => {
    changeDirectoryAbsolute(currentLocation.past.at(-1) as Path);
    undo();
  };

  const redoLocation = () => {
    changeDirectoryAbsolute(currentLocation.future.at(0) as Path);
    redo();
  };

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
        <span>{location.at(-1)}</span>
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