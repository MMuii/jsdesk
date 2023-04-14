import { useEffect } from 'react';
import { Path } from 'interfaces/fs';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { Container } from 'components/apps/FileExplorer/styled';
import { FilesExplorerBreadcrumb } from 'components/FilesExplorerBreadcrumb';
import { Table } from './Table';

interface Props {
  initialPath?: Path;
}

export const FileExplorer = ({ initialPath = ['/'] }: Props) => {
  const fsSession = useFsSession();
  const { location, changeDirectory } = fsSession;

  useEffect(() => {
    changeDirectory(initialPath);
  }, []);

  return (
    <Container>
      <Table fsSession={fsSession} />
      <FilesExplorerBreadcrumb location={location} changeDirectory={changeDirectory} />
    </Container>
  );
};
