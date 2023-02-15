import { useFsSession } from 'utils/providers/FSSessionProvider';
import { FiHardDrive } from 'react-icons/fi';
import { IoFolder } from 'react-icons/io5';
import { Chevron, Container, PathContainer, UnchangeablePathWrapper } from './styled';
import { FilesTable } from './FilesTable';
import { HeaderNavigation } from './HeaderNavigation';
import { useEffect } from 'react';
import { Path } from 'interfaces/fs';

interface Props {
  initialPath: Path;
}

export const Explorer = ({ initialPath }: Props) => {
  const {
    location,
    getCurrentDirRef,
    changeDirectory,
    changeDirectoryAbsolute,
    makeDirectoryRelative,
  } = useFsSession();

  useEffect(() => {
    changeDirectoryAbsolute(initialPath);
  }, []);

  const renderBottomNavigation = () => {
    const directories = location.map((dir, idx) => (
      <div key={`${dir}${idx}`} onClick={() => changeDirectoryAbsolute(location.slice(0, idx + 1))}>
        <IoFolder />
        <div>{dir}</div>
      </div>
    ));

    // @ts-ignore
    const result = directories.flatMap((dir, idx) => [dir, <Chevron key={idx} />]);
    result.pop();
    return result;
  };

  const currentDirFiles = getCurrentDirRef().files;

  return (
    <Container>
      <HeaderNavigation
        location={location}
        changeDirectoryAbsolute={changeDirectoryAbsolute}
        makeDirectory={() => {
          makeDirectoryRelative(['New folder']);
        }}
      />
      <FilesTable
        directories={currentDirFiles}
        changeDirectory={changeDirectory}
        location={location}
      />
      <PathContainer>
        <UnchangeablePathWrapper>
          <FiHardDrive />
          <div>LocalStorage HD</div>
          <Chevron />
          <IoFolder />
          <div>users</div>
          <Chevron />
          <IoFolder />
          <div>guest</div>
          <Chevron />
        </UnchangeablePathWrapper>
        {renderBottomNavigation()}
      </PathContainer>
    </Container>
  );
};
