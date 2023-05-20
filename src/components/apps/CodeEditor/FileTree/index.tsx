import { useState } from 'react';
import produce from 'immer';
import { Path } from 'interfaces/fs';
import { FileType } from 'utils/hooks/useFileSystem/File';
import { useContextMenu } from 'utils/providers/ContextMenuProvider';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { TreeRow } from './TreeRow';
import { ContextMenuOption } from 'components/ContextMenu';

interface Props {
  root: FileType;
  openFile: (file: FileType) => void;
  fs: ReturnType<typeof useFsSession>;
}

const createInitialState = (rootPath: Path): { [key: string]: any } => {
  if (rootPath.length === 0) {
    return {};
  }

  const [first, ...rest] = rootPath;
  const transformedRest = createInitialState(rest);

  return {
    [first]: transformedRest,
  };
};

const openFolder = (state: any, path: Path) => {
  if (path.length === 0) {
    return state;
  }

  const key = path[0];
  const nextState = { ...state };

  if (!nextState.hasOwnProperty(key)) {
    nextState[key] = {};
  }

  nextState[key] = openFolder(nextState[key], path.slice(1));

  return nextState;
};

const closeFolder = (state: any, path: Path) => {
  if (path.length === 0) {
    return;
  }

  if (path.length === 1) {
    delete state[path[0]];
    return;
  }

  closeFolder(state[path[0]], path.slice(1));
};

const isOpened = (state: any, path: Path): boolean => {
  if (path.length === 0) {
    return false;
  }

  if (path.length === 1) {
    return path[0] in state;
  }

  return isOpened(state[path[0]], path.slice(1));
};

export const FileTree = ({ root, fs, openFile }: Props) => {
  const [openedFolders, setOpenedFolders] = useState<{ [key: string]: any }>(
    createInitialState(root.path),
  );
  const [renamingFilePath, setRenamingFilePath] = useState<string | null>(null);
  const { openContextMenu } = useContextMenu();

  const open = (path: Path) => {
    setOpenedFolders(state => openFolder(state, path));
  };

  const close = (path: Path) => {
    setOpenedFolders(produce(state => closeFolder(state, path)));
  };

  const isFolderOpened = (path: Path) => {
    return isOpened(openedFolders, path);
  };

  const toggleFolder = (path: Path, isOpened: boolean) => {
    if (isOpened) close(path);
    else open(path);
  };

  const getContextMenuOptions = (file: FileType, isOpened: boolean): ContextMenuOption[] => {
    const defaultOptions = [
      {
        text: 'Rename',
        onClick: () => {
          setRenamingFilePath(file.path.join(''));
        },
      },
      {
        text: 'Delete',
        onClick: () => {
          fs.removeDirectory(file.path);
        },
      },
    ];

    if (!file.isDirectory) return defaultOptions;

    return [
      {
        text: 'New file',
        onClick: () => {
          const newFileName = fs.getChildFileNameWithCopyNumber(file.path, 'New file');
          const newFilePath = [...file.path, newFileName];

          fs.makeFileRelative(newFilePath, 'txt', true, '', false);
          setRenamingFilePath(newFilePath.join(''));

          if (!isOpened) {
            open(file.path);
          }
        },
      },
      {
        text: 'New directory',
        onClick: () => {
          fs.makeFileRelative(file.path, 'txt', true, '', false);
        },
      },
      ...defaultOptions,
    ];
  };

  const renderFileTree = () => {
    const renderFile = (file: FileType, depthLevel: number) => {
      const isOpened = isFolderOpened(file.path);
      const filePath = file.path.join('');

      return (
        <TreeRow
          key={filePath}
          file={file}
          depthLevel={depthLevel}
          isOpened={isOpened}
          isRenaming={renamingFilePath === filePath}
          openContextMenu={openContextMenu}
          renderFile={renderFile}
          contextMenuOptions={getContextMenuOptions(file, isOpened)}
          onRename={newName => {
            setRenamingFilePath(null);
            fs.moveFileAbsolute(file.path, [...file.path.slice(0, -1), newName]);
          }}
          onRenameCancel={() => setRenamingFilePath(null)}
          onClick={() => {
            if (file.isDirectory) toggleFolder(file.path, isOpened);
            else openFile(file);
          }}
        />
      );
    };

    return renderFile(root, 0);
  };

  return <div>{renderFileTree()}</div>;
};
