import { useEffect, useRef, useState } from 'react';
import { AiFillFolder, AiFillFolderOpen, AiFillFile } from 'react-icons/ai';
import { FileType } from 'utils/hooks/useFileSystem/File';
import { useContextMenu } from 'utils/providers/ContextMenuProvider';
import { ContextMenuOption } from 'components/ContextMenu';
import { TreeRow as StyledTreeRow, TreeRowInput } from './styled';

interface Props {
  file: FileType;
  depthLevel: number;
  isOpened: boolean;
  isRenaming: boolean;
  onClick: (file: FileType) => void;
  openContextMenu: ReturnType<typeof useContextMenu>['openContextMenu'];
  renderFile: (file: FileType, depthLevel: number) => JSX.Element;
  onRename: (newName: string) => void;
  onRenameCancel: () => void;
  contextMenuOptions: ContextMenuOption[];
  // TODO - receive fs methods like makeFile, deleteFile
  // TODO - change makeFile in useFsSession to automatically detect file type
  // and default to text

  // TODO - handle onRename and onRenameCancel
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
  isRenaming,
  onClick,
  openContextMenu,
  renderFile,
  onRename,
  onRenameCancel,
  contextMenuOptions,
}: Props) => {
  const [renamedName, setRenamedName] = useState(file.name);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (!isRenaming) {
        return;
      }

      if (e.key === 'Escape') {
        onRenameCancel();
      }

      if (e.key === 'Enter' && renamedName.trim().length > 0) {
        onRename(renamedName.trim());
      }
    };

    document.addEventListener('keydown', escHandler);
    return () => document.removeEventListener('keydown', escHandler);
  }, [isRenaming, onRenameCancel, onRename, renamedName]);

  const renderFileName = () => {
    if (!isRenaming) {
      return <span>{file.name}</span>;
    }

    const onInputBlur = () => {
      const trimmedName = renamedName.trim();
      if (trimmedName.length > 0) {
        onRename(renamedName);
      } else {
        onRenameCancel();
      }
    };

    return (
      <TreeRowInput
        type="text"
        value={renamedName}
        onChange={e => setRenamedName(e.target.value)}
        onBlur={onInputBlur}
        autoFocus
      />
    );
  };

  return (
    <StyledTreeRow
      style={{ paddingLeft: `${depthLevel}rem` }}
      onClick={e => {
        e.stopPropagation();
        onClick(file);
      }}
    >
      <div
        ref={ref}
        onContextMenu={e => openContextMenu(e, [ref.current as Element], contextMenuOptions)}
      >
        <span>{getFileIcon(file.isDirectory, isOpened)}</span>
        {renderFileName()}
      </div>
      {isOpened && file.files.map(f => renderFile(f, depthLevel + 1))}
    </StyledTreeRow>
  );
};
