import { useCallback, useMemo, useState } from 'react';
import produce from 'immer';
import { Path } from 'interfaces/fs';
import { FileType } from 'utils/hooks/useFileSystem/File';
import { useWindowPopup } from 'utils/providers/WindowPopupProvider';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { OpenFilePopup } from 'components/popups/OpenFilePopup';

export interface OpenedFile extends FileType {
  currentContent: string;
}

export const useCodeEditor = () => {
  const [projectRoot, setProjectRoot] = useState<Path | null>(null);
  const [openedFiles, setOpenedFiles] = useState<OpenedFile[]>([]);
  const [selectedFileIdx, setSelectedFileIdx] = useState<number | null>(null);
  const selectedFile = useMemo(
    () => openedFiles[selectedFileIdx as number] ?? null,
    [openedFiles, selectedFileIdx],
  );
  const { openPopup } = useWindowPopup();
  const fs = useFsSession();

  const openProjectRoot = () => {
    openPopup({
      acceptCallback: (selectedPath: Path) => {
        const selectedFile = fs.getFileRef(selectedPath);
        console.log('selected file:', selectedFile);
        if (selectedFile.isDirectory) {
          setProjectRoot(selectedPath);
        } else {
          openFile(selectedFile);
        }
      },
      fullWidth: true,
      ContentComponent: OpenFilePopup,
      contentComponentProps: {
        displayedFileTypes: ['dir', 'txt', 'js', 'css', 'html'],
      },
    });
  };

  const openFile = useCallback(
    (file: FileType) => {
      const openingFilePath = file.path.join('');
      const alreadyOpenedFileIdx = openedFiles.findIndex(f => f.path.join('') === openingFilePath);
      if (alreadyOpenedFileIdx !== -1) {
        setSelectedFileIdx(alreadyOpenedFileIdx);
        return;
      }

      const newlyOpenedFile = { ...file, currentContent: file.content };
      if (openedFiles.length === 0) {
        setSelectedFileIdx(0);
      }

      setOpenedFiles(prev => [...prev, newlyOpenedFile]);
      // at this point selectedFiles arr has not yet updated
      // but it is fine to update selected file index to last one
      setSelectedFileIdx(openedFiles.length);
    },
    [openedFiles],
  );

  const closeFile = (file: OpenedFile) => {
    const closingFilePath = file.path.join('');
    const closingFileIndex = openedFiles.findIndex(f => f.path.join('') === closingFilePath);
    const newOpenedFilesArr = openedFiles.filter(f => f.path.join('') !== closingFilePath);

    if (closingFileIndex === openedFiles.length - 1 && newOpenedFilesArr.length > 0) {
      setSelectedFileIdx(newOpenedFilesArr.length - 1);
    } else if (newOpenedFilesArr.length === 0) {
      setSelectedFileIdx(null);
    }

    setOpenedFiles(newOpenedFilesArr);
  };

  const setSelectedFile = (file: OpenedFile) => {
    const selectedFilePath = file.path.join('');
    const idx = openedFiles.findIndex(f => f.path.join('') === selectedFilePath);
    setSelectedFileIdx(idx);
  };

  const modifySelectedFile = (value?: string) => {
    setOpenedFiles(
      produce(draftFiles => {
        draftFiles[selectedFileIdx as number].currentContent = value ?? '';
      }),
    );
  };

  const saveSelectedFile = () => {
    const openedFile = openedFiles[selectedFileIdx as number];
    fs.saveFile(openedFile.path, openedFile.currentContent);

    setOpenedFiles(
      produce(draftFiles => {
        draftFiles[selectedFileIdx as number].content = openedFile.currentContent;
      }),
    );
  };

  return {
    modifySelectedFile,
    projectRoot,
    setProjectRoot,
    openedFiles,
    setOpenedFiles,
    selectedFile,
    setSelectedFile,
    openPopup,
    openFile,
    openProjectRoot,
    closeFile,
    saveSelectedFile,
    fs,
  };
};
