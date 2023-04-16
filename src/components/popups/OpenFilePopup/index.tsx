import { useEffect } from 'react';
import { Path } from 'interfaces/fs';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { FilesExplorerBreadcrumb } from 'components/FilesExplorerBreadcrumb';
import { ButtonsContainer, Container, PathContainer } from './styled';
import { Table } from './Table';

interface Props {
  onAccept: (path: Path) => void;
  onCancel: () => void;
  displayedFileTypes?: string[];
  initialPath?: Path;
}

export const OpenFilePopup = ({
  onAccept,
  onCancel,
  displayedFileTypes,
  initialPath = ['/'],
}: Props) => {
  const fsSession = useFsSession();
  const { changeDirectory, location } = fsSession;

  useEffect(() => {
    changeDirectory(initialPath);
  }, []);

  return (
    <Container>
      <Table
        fsSession={fsSession}
        onDirectorySelect={onAccept}
        displayedFileTypes={displayedFileTypes}
      />
      <PathContainer>
        <FilesExplorerBreadcrumb location={location} changeDirectory={changeDirectory} />
        <ButtonsContainer>
          <button onClick={() => onAccept(location)}>Open</button>
          <button onClick={onCancel}>Cancel</button>
        </ButtonsContainer>
      </PathContainer>
    </Container>
  );
};
