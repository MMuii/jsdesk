import { useEffect } from 'react';
import { Path } from 'interfaces/fs';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { Container, PathContainer } from 'components/apps/FileExplorer/styled';
import { FilesTable } from 'components/apps/FileExplorer/FilesTable';
import { BottomNavigation } from './BottomNavigation';

interface Props {
  initialPath?: Path;
}

export const FileExplorer = ({ initialPath = ['/'] }: Props) => {
  const {
    location,
    getCurrentDirRef,
    changeDirectory,
    makeFileRelative,
    moveFileAbsolute,
    removeDirectory,
  } = useFsSession();

  useEffect(() => {
    changeDirectory(initialPath);
  }, []);

  return (
    <Container>
      <FilesTable
        currentDirRef={getCurrentDirRef()}
        changeDirectory={changeDirectory}
        moveFile={moveFileAbsolute}
        removeFile={removeDirectory}
        location={location}
        makeFile={makeFileRelative}
      />
      <PathContainer>
        <BottomNavigation location={location} changeDirectory={changeDirectory} />
      </PathContainer>
    </Container>
  );
};
