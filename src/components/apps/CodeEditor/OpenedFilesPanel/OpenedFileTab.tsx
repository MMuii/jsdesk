import { IoClose } from 'react-icons/io5';
import { GoPrimitiveDot } from 'react-icons/go';
import { OpenedFileContainer } from './styled';
import { OpenedFile } from '../useCodeEditor';
import { useCallback } from 'react';

interface Props {
  file: OpenedFile;
  setSelectedFile: (file: OpenedFile) => void;
  isSelected: boolean;
  closeFile: () => void;
}

export const OpenedFileTab = ({ file, setSelectedFile, isSelected, closeFile }: Props) => {
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      closeFile();
    },
    [closeFile],
  );

  return (
    <OpenedFileContainer value={file} onClick={() => setSelectedFile(file)} $selected={isSelected}>
      <div>{file.name}</div>
      {file.content === file.currentContent ? (
        <IoClose onClick={onClick} />
      ) : (
        <GoPrimitiveDot onClick={onClick} />
      )}
    </OpenedFileContainer>
  );
};
