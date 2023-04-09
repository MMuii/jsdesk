import { useEffect, useState } from 'react';
import { BottomNavigation } from 'components/apps/FileExplorer/BottomNavigation';
import { Container } from 'components/apps/FileExplorer/styled';
import { Path } from 'interfaces/fs';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { FilesTable } from './FilesTable';
import {
  BottomBarContainer,
  ButtonsContainer,
  FilenameContainer,
  FilenameInput,
  PathContainer,
  PathWrapper,
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
  const { location, getCurrentDirRef, changeDirectory, makeFileRelative, moveFileAbsolute } =
    useFsSession();
  const [filename, setFilename] = useState<string>(initialFilename);

  useEffect(() => {
    changeDirectory(initialPath);
  }, []);

  return (
    <Container>
      <FilesTable
        displayedFileTypes={displayedFileTypes}
        currentDirRef={getCurrentDirRef()}
        changeDirectory={changeDirectory}
        moveFile={moveFileAbsolute}
        location={location}
        makeFile={makeFileRelative}
        onDirectorySelect={onAccept}
      />
      <BottomBarContainer>
        <FilenameContainer>
          <div style={{ whiteSpace: 'nowrap' }}>File name:</div>
          <FilenameInput value={filename} onChange={e => setFilename(e.target.value)} />
        </FilenameContainer>
        <Separator />
        <PathContainer style={{ display: 'flex' }}>
          <PathWrapper>
            <BottomNavigation location={location} changeDirectory={changeDirectory} />
          </PathWrapper>
          <ButtonsContainer>
            <button onClick={() => onAccept([...location, filename])}>{acceptButtonText}</button>
            <button onClick={onCancel}>Cancel</button>
          </ButtonsContainer>
        </PathContainer>
      </BottomBarContainer>
    </Container>
  );
};
