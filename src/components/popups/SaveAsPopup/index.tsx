import { useEffect, useState } from 'react';
import { FilesExplorerBreadcrumb } from 'components/FilesExplorerBreadcrumb';
import { Path } from 'interfaces/fs';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { Table } from 'components/popups/SaveAsPopup/Table';
import {
  BottomBarContainer,
  ButtonsContainer,
  Container,
  FilenameContainer,
  FilenameInput,
  PathContainer,
} from 'components/popups/SaveAsPopup/styled';

interface Props extends PathPickerProps {
  onAccept: (path: Path) => void;
  onCancel: () => void;
}

export interface PathPickerProps {
  displayedFileTypes?: string[];
  initialFilename?: string;
  initialPath?: Path;
}

export const SaveAsPopup = ({
  displayedFileTypes,
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
        <PathContainer>
          <FilesExplorerBreadcrumb location={location} changeDirectory={changeDirectory} />
          <ButtonsContainer>
            <button onClick={() => onAccept([...location, filename])}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </ButtonsContainer>
        </PathContainer>
      </BottomBarContainer>
    </Container>
  );
};
