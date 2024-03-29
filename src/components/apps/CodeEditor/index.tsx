import { useCallback, useEffect, useRef, useState } from 'react';
import { VscPlay } from 'react-icons/vsc';
import { BsTerminal, BsTerminalFill } from 'react-icons/bs';
import { MdSave } from 'react-icons/md';
import { WindowNavbarContainer } from 'components/styled/WindowNavbar';
import { Terminal, TerminalRef } from 'components/apps/Terminal';
import { Button } from 'components/styled/Button';
import { HoverPopupPosition } from 'components/HoverPopup';
import { IconButton } from 'components/IconButton';
import { Path } from 'interfaces/fs';

import { OpenedFilesPanel } from './OpenedFilesPanel';
import { FileTree } from './FileTree';
import { FileEditor } from './FileEditor';
import {
  CodeEditorAppContainer,
  EditorContainer,
  FileTreeContainer,
  NoFilesOpenedContainer,
  TerminalContainer,
} from './styled';
import { useCodeEditor } from './useCodeEditor';

interface Props {
  initialOpenedFilePath?: Path;
}

export const CodeEditor = ({ initialOpenedFilePath }: Props) => {
  const [isTerminalOpened, setIsTerminalOpened] = useState(false);
  const {
    modifySelectedFile,
    closeFile,
    openFile,
    openedFiles,
    openProjectRoot,
    projectRoot,
    selectedFile,
    setOpenedFiles,
    setSelectedFile,
    saveSelectedFile,
    fs,
  } = useCodeEditor();
  const terminalRef = useRef<TerminalRef>(null);

  useEffect(() => {
    if (initialOpenedFilePath) {
      const file = fs.getFileRef(initialOpenedFilePath);
      openFile(file);
    }
  }, []);

  const renderEditor = () => {
    if ((projectRoot === null && openedFiles.length === 0) || selectedFile === null) {
      return (
        <NoFilesOpenedContainer>
          <div>
            <h2>No folder or files opened.</h2>
            <h3>Open file or folder to start editing.</h3>
            <Button $variant="proceed" onClick={openProjectRoot}>
              Open folder
            </Button>
          </div>
        </NoFilesOpenedContainer>
      );
    }

    return (
      <FileEditor
        selectedFile={selectedFile}
        isTerminalOpened={isTerminalOpened}
        handleFileContentChange={modifySelectedFile}
      />
    );
  };

  const renderFileTree = () => {
    if (projectRoot === null) {
      return (
        <div style={{ width: '100%', display: 'grid', placeItems: 'center', rowGap: '1rem' }}>
          <div>No folder opened.</div>
          <Button $variant="proceed" onClick={openProjectRoot}>
            Open folder
          </Button>
        </div>
      );
    }

    return <FileTree root={fs.getFileRef(projectRoot)} fs={fs} openFile={openFile} />;
  };

  const renderTerminalIcon = useCallback(() => {
    const icon = isTerminalOpened ? <BsTerminalFill /> : <BsTerminal />;
    return <IconButton icon={icon} onClick={() => setIsTerminalOpened(p => !p)} />;
  }, [isTerminalOpened]);

  const runFile = () => {
    if (!terminalRef.current || !selectedFile) return;
    if (!isTerminalOpened) {
      setIsTerminalOpened(true);
    }

    terminalRef.current.run(
      `run "${selectedFile.currentContent}"`,
      `run ${selectedFile.path.join('')}`,
    );
  };

  return (
    <CodeEditorAppContainer>
      <FileTreeContainer>
        <WindowNavbarContainer>Explorer</WindowNavbarContainer>
        <div>{renderFileTree()}</div>
      </FileTreeContainer>
      <EditorContainer id="editor-container">
        <WindowNavbarContainer style={{ padding: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <IconButton
              icon={<VscPlay />}
              onClick={runFile}
              hoverPopupContent="Run"
              hoverPopupPosition={HoverPopupPosition.left}
            />
            <IconButton
              icon={<MdSave />}
              onClick={saveSelectedFile}
              disabled={selectedFile && selectedFile.content === selectedFile.currentContent}
              hoverPopupContent="Save"
            />
          </div>
          {renderTerminalIcon()}
        </WindowNavbarContainer>
        {openedFiles.length > 0 && (
          <OpenedFilesPanel
            closeFile={closeFile}
            selectedFile={selectedFile}
            openedFiles={openedFiles}
            setOpenedFiles={setOpenedFiles}
            setSelectedFile={setSelectedFile}
          />
        )}
        {renderEditor()}
        <TerminalContainer style={{ display: isTerminalOpened ? 'block' : 'none' }}>
          <Terminal ref={terminalRef} />
        </TerminalContainer>
      </EditorContainer>
    </CodeEditorAppContainer>
  );
};
