import { useState, useEffect } from 'react';
import produce from 'immer';
import { useLocalStorage } from './useLocalStorage';

type Path = string[];

interface Directory {
  files: { [key: string]: Directory };
  type: string;
}

interface FileSystem {
  '/': Directory;
}

const initialFs: FileSystem = {
  '/': {
    type: 'dir',
    files: {
      img: {
        type: 'dir',
        files: {
          dupa: {
            type: 'dir',
            files: {
              'file.txt': {
                type: 'file',
                // @ts-ignore
                value: 'value',
              },
            },
          },
          cyce: {
            type: 'dir',
            files: {},
          },
          wadowice: {
            type: 'dir',
            files: {},
          },
        },
      },
    },
  },
};

// TODO - handle when path starts with /, eg. /dir/name
// TODO - handle case when path starts with . eg. ./dir/name
const getPathFromPathString = (pathString: string): Path => {
  if (pathString === '/') {
    return ['/'];
  }

  return pathString.split('/');
};

const getAbsoluteRefByPath = (fs: FileSystem, path: Path): Directory | null => {
  try {
    let dir = fs['/'] as any;

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
  const [fs, setFs] = useLocalStorage('fs', initialFs);
  const [location, setLocation] = useState<Path>(['/']);

  useEffect(() => {
    console.log('location:', location);
  }, [location]);

  // TODO - handle case when pathString is not a valid directory
  const listFiles = (pathString?: string): Array<[string, string]> => {
    const path = pathString === undefined ? location : getPathFromPathString(pathString);
    console.log('path:', path);
    const dirRef = getAbsoluteRefByPath(fs, path) as Directory;

    return Object.entries(dirRef.files).map(([fileName, content]) => [fileName, content.type]);
  };

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

  return {
    location,
    changeDirectory,
    removeDirectory,
    makeDirectory,
    listFiles,
  };
};
