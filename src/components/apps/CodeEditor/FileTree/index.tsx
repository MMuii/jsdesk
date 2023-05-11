import { useEffect, useState } from 'react';
import produce from 'immer';
import { AiFillFolder, AiFillFolderOpen, AiFillFile } from 'react-icons/ai';
import { Path } from 'interfaces/fs';
import { FileType } from 'utils/hooks/useFileSystem/File';
import { useContextMenu } from 'utils/providers/ContextMenuProvider';
import { TreeRow } from './styled';

interface Props {
  root: FileType;
  openFile: (file: FileType) => void;
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

export const FileTree = ({ root, openFile }: Props) => {
  const [openedFolders, setOpenedFolders] = useState<{ [key: string]: any }>(
    createInitialState(root.path),
  );
  const { openContextMenu } = useContextMenu();

  useEffect(() => {
    console.log('opened folders:', openedFolders);
  }, [openedFolders]);

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

  const getFileIcon = (isDirectory: boolean, isOpened: boolean) => {
    if (isDirectory) {
      return isOpened ? <AiFillFolderOpen /> : <AiFillFolder />;
    }

    return <AiFillFile />;
  };

  const renderFileTree = () => {
    const renderFile = (file: FileType, depthLevel: number) => {
      const filePath = file.path.join('');
      const isOpened = isFolderOpened(file.path);

      return (
        <TreeRow
          key={filePath}
          style={{ paddingLeft: `${depthLevel}rem` }}
          onClick={e => {
            e.stopPropagation();
            if (file.isDirectory) toggleFolder(file.path, isOpened);
            else openFile(file);
          }}
        >
          <div>
            <span>{getFileIcon(file.isDirectory, isOpened)}</span>
            <span>{file.name}</span>
          </div>
          {isOpened && file.files.map(f => renderFile(f, depthLevel + 1))}
        </TreeRow>
      );
    };

    return renderFile(root, 0);
  };

  return <div>{renderFileTree()}</div>;
};
