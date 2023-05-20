import { useCallback, useMemo, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { GoPrimitiveDot } from 'react-icons/go';
import { OpenedFileContainer } from './styled';
import { OpenedFile } from '../useCodeEditor';

interface Props {
  file: OpenedFile;
  setSelectedFile: (file: OpenedFile) => void;
  isSelected: boolean;
  closeFile: () => void;
}

export const OpenedFileTab = ({ file, setSelectedFile, isSelected, closeFile }: Props) => {
  const [isHovering, setIsHovering] = useState(false);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      closeFile();
    },
    [closeFile],
  );

  const isEdited = useMemo(
    () => file.content !== file.currentContent,
    [file.content, file.currentContent],
  );

  const renderIcon = () => {
    if (isEdited && !isHovering) {
      return <GoPrimitiveDot onClick={onClick} />;
    }

    return <IoClose onClick={onClick} />;
  };

  return (
    <OpenedFileContainer
      value={file}
      onClick={() => setSelectedFile(file)}
      $selected={isSelected}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div>{file.name}</div>
      {renderIcon()}
    </OpenedFileContainer>
  );
};
