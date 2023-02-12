import { useFsContext } from 'utils/providers/FSProvider';
import { useState, useEffect } from 'react';
import produce from 'immer';
import { Directory, FileSystem, Path } from 'interfaces/fs';

const parsePath = (path: string | Path): Path => {
  if (typeof path === 'object') {
    return path;
  }

  // if (path === '/') {
  //   return ['/'];
  // }

  return path.split('/');
};

// TODO - handle when path starts with /, eg. /dir/name
// TODO - handle case when path starts with . eg. ./dir/name
const getPathFromPathString = (pathString: string): Path => {
  // if (pathString === 'desktop') {
  //   return ['desktop'];
  // }

  return pathString.split('/');
};

const getAbsoluteRefByPath = (fs: FileSystem, path: Path): Directory | null => {
  try {
    let dir = fs['desktop'] as any;

    if (path.length > 1) {
      path.slice(1)?.forEach(dirName => {
        dir = dir.files[dirName];
      });
    }

    return dir;
  } catch (err) {
    return null;
  }
};

const getPathRelativeToPath = (currentPath: Path, relativePathString: string): Path => {
  const relativePath = getPathFromPathString(relativePathString);
  const resultPath = [...currentPath];

  relativePath.forEach(dirName => {
    if (dirName === '..') {
      if (resultPath.length > 1) {
        resultPath.pop();
      }
    } else {
      resultPath.push(dirName);
    }
  });

  return resultPath;
};

export const useFileSystem = () => {
  const [fs, setFs] = useFsContext();
  const [location, setLocation] = useState<Path>(['desktop']);

  useEffect(() => {
    console.log('location:', location);
  }, [location]);

  // TODO - handle case when pathString is not a valid directory
  const listFiles = (pathString?: string): Array<[string, Directory]> => {
    const path = pathString === undefined ? location : getPathFromPathString(pathString);
    console.log('path:', path);
    const dirRef = getAbsoluteRefByPath(fs, path) as Directory;

    return Object.entries(dirRef.files);
    // return Object.entries(dirRef.files).map(([fileName, content]) => [fileName, content.type]);
  };

  const getCurrentDirRef = (() => getAbsoluteRefByPath(fs, location)) as () => Directory;

  const makeDirectory = (pathString: string): string | null => {
    const newPath = getPathRelativeToPath(location, pathString);
    const parentPath = [...newPath.slice(0, -1)];
    const parentPathRef = getAbsoluteRefByPath(fs, parentPath);
    if (!parentPathRef || parentPathRef.type !== 'dir') {
      return `mkdir: Directory ${parentPath.join('/')} does not exist`;
    }

    setFs(
      produce(draft => {
        const dirRef = getAbsoluteRefByPath(draft, location) as Directory;
        const newDirName = newPath.at(-1) as string;
        dirRef.files[newDirName] = {
          type: 'dir',
          updatedAt: new Date().toISOString(),
          files: {},
        };
      }),
    );

    return null;
  };

  const removeDirectory = (pathString: string): string | null => {
    const newPath = getPathRelativeToPath(location, pathString);
    const newPathRef = getAbsoluteRefByPath(fs, newPath);

    if (!newPathRef) {
      return `rm: Directory or file ${pathString} does not exist`;
    }

    setFs(
      produce(draft => {
        const [fileToDelete, parentPath] = [newPath.pop(), newPath];
        const parentDirRef = getAbsoluteRefByPath(draft, parentPath);

        delete parentDirRef!.files[fileToDelete as any];
      }),
    );

    return null;
  };

  const changeDirectory = (pathString: string): string | null => {
    const newPath = getPathRelativeToPath(location, pathString);
    const newPathRef = getAbsoluteRefByPath(fs, newPath);

    if (!newPathRef || newPathRef.type !== 'dir') {
      return `cd: Directory ${pathString} does not exist`;
    }

    setLocation(newPath);
    return null;
  };

  const changeDirectoryAbsolute = (pathString: string | Path): string | null => {
    const newPath = parsePath(pathString);
    const newPathRef = getAbsoluteRefByPath(fs, newPath);

    if (!newPathRef || newPathRef.type !== 'dir') {
      return `cd: Directory ${pathString} does not exist`;
    }

    setLocation(newPath);
    return null;
  };

  return {
    location,
    changeDirectory,
    changeDirectoryAbsolute,
    removeDirectory,
    makeDirectory,
    listFiles,
    getCurrentDirRef,
  };
};
