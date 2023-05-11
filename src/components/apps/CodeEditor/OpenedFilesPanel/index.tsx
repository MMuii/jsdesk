import { useMemo } from 'react';
import { OpenedFilesPanelContainer } from './styled';
import { OpenedFile } from '../useCodeEditor';
import { OpenedFileTab } from './OpenedFileTab';

interface Props {
  openedFiles: OpenedFile[];
  selectedFile: OpenedFile | null;
  setOpenedFiles: React.Dispatch<React.SetStateAction<OpenedFile[]>>;
  setSelectedFile: (file: OpenedFile) => void;
  closeFile: (file: OpenedFile) => void;
}

export const OpenedFilesPanel = ({
  openedFiles,
  setOpenedFiles,
  selectedFile,
  setSelectedFile,
  closeFile,
}: Props) => {
  const selectedFilePath = useMemo(() => selectedFile?.path.join(''), [selectedFile]);

  const renderOpenedFiles = () => {
    return openedFiles.map(file => {
      const path = file.path.join('');

      return (
        <OpenedFileTab
          key={path}
          file={file}
          isSelected={path === selectedFilePath}
          setSelectedFile={setSelectedFile}
          closeFile={() => closeFile(file)}
        />
      );
    });
  };

  return (
    <OpenedFilesPanelContainer
      id="opened-files-panel-container"
      onReorder={setOpenedFiles}
      values={openedFiles}
      axis="x"
    >
      {renderOpenedFiles()}
    </OpenedFilesPanelContainer>
  );
};
