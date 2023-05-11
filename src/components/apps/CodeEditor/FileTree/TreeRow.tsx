import { FileType } from 'utils/hooks/useFileSystem/File';
import { AiFillFolder, AiFillFolderOpen, AiFillFile } from 'react-icons/ai';
import { TreeRow as StyledTreeRow } from './styled';

interface Props {
  file: FileType;
  depthLevel: number;
  isOpened: boolean;
  onClick: (file: FileType) => void;
  openContextMenu: (arg: any) => void;
  renderFile: (file: FileType, depthLevel: number) => JSX.Element;
}

const getFileIcon = (isDirectory: boolean, isOpened: boolean) => {
  if (isDirectory) {
    return isOpened ? <AiFillFolderOpen /> : <AiFillFolder />;
  }

  return <AiFillFile />;
};

export const TreeRow = ({
  file,
  depthLevel,
  isOpened,
  onClick,
  openContextMenu,
  renderFile,
}: Props) => {
  return (
    <StyledTreeRow
      style={{ paddingLeft: `${depthLevel}rem` }}
      onClick={e => {
        e.stopPropagation();
        onClick(file);
      }}
    >
      <div>
        <span>{getFileIcon(file.isDirectory, isOpened)}</span>
        <span>{file.name}</span>
      </div>
      {isOpened && file.files.map(f => renderFile(f, depthLevel + 1))}
    </StyledTreeRow>
  );
};
