import { useEffect, useState } from 'react';
import { FilesExplorerBreadcrumb } from 'components/FilesExplorerBreadcrumb';
import { Container } from 'components/apps/FileExplorer/styled';
import { Path } from 'interfaces/fs';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { Table } from './Table';
import {
  BottomBarContainer,
  ButtonsContainer,
  FilenameContainer,
  FilenameInput,
  PathContainer,
  Separator,
} from './styled';

interface Props extends PathPickerProps {
  onAccept: (path: Path) => void;
  onCancel: () => void;
}

export interface PathPickerProps {
  acceptButtonText?: string;
  displayedFileTypes?: string[];
  initialFilename?: string;
  initialPath?: Path;
}

export const PathPicker = ({
  displayedFileTypes,
  acceptButtonText = 'Open',
  initialPath = ['/'],
  initialFilename = 'New image.jpg',
  onAccept,
  onCancel,
}: Props) => {
  const fsSession = useFsSession();
  const { changeDirectory, location } = fsSession;
  const [filename, setFilename] = useState<string>(initialFilename);

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
      <BottomBarContainer>
        <FilenameContainer>
          <div style={{ whiteSpace: 'nowrap' }}>File name:</div>
          <FilenameInput value={filename} onChange={e => setFilename(e.target.value)} />
        </FilenameContainer>
        <Separator />
        <PathContainer style={{ display: 'flex' }}>
          <FilesExplorerBreadcrumb location={location} changeDirectory={changeDirectory} />
          <ButtonsContainer>
            <button onClick={() => onAccept([...location, filename])}>{acceptButtonText}</button>
            <button onClick={onCancel}>Cancel</button>
          </ButtonsContainer>
        </PathContainer>
      </BottomBarContainer>
    </Container>
  );
};
