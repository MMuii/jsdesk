import { useFsContext } from 'utils/providers/FSProvider';
import { useState, useEffect } from 'react';
import produce from 'immer';
import { Directory, FileSystem, Path } from 'interfaces/fs';

const getCopyNumber = (filename: string, allFileNamesInDir: string[]): number => {
  const regexp = new RegExp(`${filename} \\((?<copyNumber>[0-9]+)\\)`);
  const copyNumbers = allFileNamesInDir.reduce((numbers, fname) => {
    const match = fname.match(regexp);
    if (match === null) {
      return numbers;
    }

    return [...numbers, Number(match.groups!.copyNumber)];
  }, [] as number[]);

  const copyNumbersStreak = copyNumbers.sort().reduce((numbers, currentNumber) => {
    if (!numbers.length || currentNumber === numbers[numbers.length - 1] + 1) {
      return [...numbers, currentNumber];
    }

    return [...numbers];
  }, [] as number[]);

  return copyNumbersStreak.length ? copyNumbersStreak[copyNumbersStreak.length - 1] + 1 : 1;
};

const parsePath = (path: string | Path): Path => {
  if (typeof path === 'object') {
    return path;
  }

  return path.split('/');
};

// TODO - handle when path starts with /, eg. /dir/name
// TODO - handle case when path starts with . eg. ./dir/name
const getPathFromPathString = (pathString: string): Path => {
  return pathString.split('/');
};

// TODO - better error handling, instead of null return an enum
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

const getPathRelativeToPath = (currentPath: Path, relativePath: Path): Path => {
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
    const dirRef = getAbsoluteRefByPath(fs, path) as Directory;

    return Object.entries(dirRef.files);
  };

  const getCurrentDirRef = (() => getAbsoluteRefByPath(fs, location)) as () => Directory;

  const makeDirectoryRelative = (
    pathString: string | Path,
    addEvenIfExists: boolean = false,
  ): string | null => {
    const path = parsePath(pathString);
    const newDirPathRelative = getPathRelativeToPath(location, path);
    const newDirPathRef = getAbsoluteRefByPath(fs, newDirPathRelative);

    const parentDirPath = [...newDirPathRelative.slice(0, -1)];
    const parentDirRef = getAbsoluteRefByPath(fs, parentDirPath);

    if (!parentDirRef || parentDirRef.type !== 'dir') {
      return `mkdir: Directory ${parentDirPath.join('/')} does not exist`;
    }

    if (newDirPathRef) {
      if (addEvenIfExists) {
        const copyNumber = getCopyNumber(
          newDirPathRelative[newDirPathRelative.length - 1],
          Object.keys(parentDirRef.files),
        );
        newDirPathRelative[newDirPathRelative.length - 1] += ` (${copyNumber})`;
      } else {
        return `mkdir: Directory ${newDirPathRelative.join('/')} already exists`;
      }
    }

    setFs(
      produce(draft => {
        const parentDirRef = getAbsoluteRefByPath(draft, parentDirPath) as Directory;
        const newDirName = newDirPathRelative[newDirPathRelative.length - 1];
        parentDirRef.files[newDirName] = {
          type: 'dir',
          updatedAt: new Date().toISOString(),
          files: {},
        };
      }),
    );

    return null;
  };

  const removeDirectory = (pathString: string | Path): string | null => {
    const path = parsePath(pathString);
    const fileToDeletePath = getPathRelativeToPath(location, path);
    const fileToDeletePathRef = getAbsoluteRefByPath(fs, fileToDeletePath);

    if (!fileToDeletePathRef) {
      return `rm: Directory or file ${pathString} does not exist`;
    }

    setFs(
      produce(draft => {
        const [fileToDelete, parentPath] = [fileToDeletePath.pop(), fileToDeletePath];
        const parentDirRef = getAbsoluteRefByPath(draft, parentPath);

        delete parentDirRef!.files[fileToDelete as any];
      }),
    );

    return null;
  };

  const changeDirectory = (pathString: string | Path): string | null => {
    const path = parsePath(pathString);
    const newPath = getPathRelativeToPath(location, path);
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

  const moveFileAbsolute = (pathString: string | Path, newPath: string | Path): string | null => {
    const currentFilePath = parsePath(pathString);
    const currentFileRef = getAbsoluteRefByPath(fs, currentFilePath);
    if (!currentFileRef) {
      return `cd: File ${pathString} does not exist`;
    }

    const movedFilePath = parsePath(newPath);
    const movedFilePathRef = getAbsoluteRefByPath(fs, movedFilePath);
    if (!movedFilePathRef) {
      return `mv: ${}`
    }

    return null;
  }

  const renameFileAbsolute = (pathString: string | Path, newName: string): string | null => {
    const currentFilePath = parsePath(pathString);
    const currentFileRef = getAbsoluteRefByPath(fs, currentFilePath);
    if (!currentFileRef) {
      return `cd: File ${pathString} does not exist`;
    }

    const parentPath = getPathRelativeToPath(currentFilePath, ['..']);
    const parentDirRef = getAbsoluteRefByPath(fs, parentPath);
    if (newName in parentDirRef!.files) {
      return `dupa`;
    }

    setFs(
      produce(draft => {
        const parentPathRef = getAbsoluteRefByPath(draft, parentPath) as Directory;
        const oldName = currentFilePath.at(-1) as string;
        parentPathRef.files[newName] = {} as Directory;
        Object.assign(parentPathRef.files[newName], parentPathRef.files[oldName]);
        delete parentPathRef.files[oldName];
      }),
    );

    return null;
  };

  return {
    location,
    changeDirectory,
    changeDirectoryAbsolute,
    removeDirectory,
    makeDirectoryRelative,
    listFiles,
    getCurrentDirRef,
    renameFileAbsolute,
  };
};
