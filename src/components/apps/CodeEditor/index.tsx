import { useCallback, useEffect, useRef, useState } from 'react';
import { FiTriangle } from 'react-icons/fi';
import { BsTerminal, BsTerminalFill } from 'react-icons/bs';
import { WindowNavbarContainer } from 'components/styled/WindowNavbar';
import { Terminal, TerminalRef } from 'components/apps/Terminal';
import { Button } from 'components/styled/Button';
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
import { IconButton } from 'components/IconButton';

export const CodeEditor = () => {
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
    fs,
  } = useCodeEditor();
  const terminalRef = useRef<TerminalRef>(null);

  useEffect(() => {
    console.log('openedFiles', openedFiles);
  }, [openedFiles]);

  useEffect(() => {
    console.log('NEW SELECTED FILE:', selectedFile);
  }, [selectedFile]);

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

    return <FileTree root={fs.getFileRef(projectRoot)} openFile={openFile} />;
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

    terminalRef.current.run(`run "${selectedFile.content}"`, `run ${selectedFile.path.join('')}`);
  };

  return (
    <CodeEditorAppContainer>
      <FileTreeContainer>
        <WindowNavbarContainer>Explorer</WindowNavbarContainer>
        <div>{renderFileTree()}</div>
      </FileTreeContainer>
      <EditorContainer id="editor-container">
        <WindowNavbarContainer style={{ padding: '0.5rem' }}>
          <IconButton
            icon={<FiTriangle />}
            onClick={runFile}
            style={{ transform: 'rotate(90deg)' }}
          />
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
