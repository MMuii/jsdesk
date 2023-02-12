import { useEffect } from 'react';
import { Path } from 'interfaces/fs';
import useUndo from 'use-undo';
import { CurrentDirHeaderContainer, NavArrow } from './styled';

interface Props {
  location: Path;
  changeDirectoryAbsolute: (pathString: string | Path) => string | null;
}

export const HeaderNavigation = ({ location, changeDirectoryAbsolute }: Props) => {
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
      <div>
        <NavArrow onClick={undoLocation} $enabled={canUndo} />
        <NavArrow
          onClick={redoLocation}
          $enabled={canRedo}
          style={{ transform: 'rotate(180deg)' }}
        />
      </div>
      <span>{location.at(-1)}</span>
    </CurrentDirHeaderContainer>
  );
};
