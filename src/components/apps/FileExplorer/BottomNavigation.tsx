import { Path } from 'interfaces/fs';
import { FiHardDrive } from 'react-icons/fi';
import { IoFolder } from 'react-icons/io5';
import { Chevron } from './styled';

interface Props {
  location: Path;
  changeDirectory: (path: Path) => void;
}

export const BottomNavigation = ({ location, changeDirectory }: Props) => {
  const renderBottomNavigation = () => {
    return location.map((dir, idx) => (
      <div key={`${dir}${idx}`} onClick={() => changeDirectory(location.slice(0, idx + 1))}>
        <IoFolder />
        <div>{dir === '/' ? 'desktop' : dir}</div>
        {idx !== location.length - 1 && <Chevron />}
      </div>
    ));
  };

  return (
    <>
      <div>
        <FiHardDrive />
        <div>LocalStorage HD</div>
        <Chevron />
      </div>
      <div>
        <IoFolder />
        <div>users</div>
        <Chevron />
      </div>
      <div>
        <IoFolder />
        <div>guest</div>
        <Chevron />
      </div>
      {renderBottomNavigation()}
    </>
  );
};
