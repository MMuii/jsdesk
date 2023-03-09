import { useFsContext } from 'utils/providers/FSProvider';
import { useState, useEffect } from 'react';
import produce from 'immer';
import { Path } from 'interfaces/fs';
import { FileSystem } from './useFileSystem/FileSystem';
import { FileSystemError } from './useFileSystem/FileSystemError';
import { File } from './useFileSystem/File';

export const useFileSystem = () => {
  const { root, setRoot } = useFsContext();
  const [location, setLocation] = useState<Path>(['/']);

  useEffect(() => {
    console.log('root:', root);
  }, [root]);

  useEffect(() => {
    console.log('location:', location);
  }, [location]);

  const workOnDraftFs = (fn: (fs: FileSystem) => void): File => {
    const draft = produce<File | FileSystemError>(root, draftRoot => {
      const fs = new FileSystem(draftRoot as File, location);
      try {
        fn(fs);
      } catch (err) {
        if (err instanceof FileSystemError) {
          return err;
        }

        throw err;
      }
    });

    if (draft instanceof FileSystemError) {
      throw draft;
    }

    return draft;
  };

  const changeDirectory = (path: string | Path): string | void => {
    const fs = new FileSystem(root, location);

    try {
      const file = fs.getFileByPath(path);
      if (!file.isDirectory) {
        return `cd: Directory ${path} is not a directory`;
      }

      setLocation(file.path);
    } catch (err) {
      if (err instanceof FileSystemError) {
        console.error(err);
        return `cd: ${err.message}`;
      }

      throw err;
    }
  };

  const removeDirectory = (path: string | Path): string | void => {
    try {
      const newRoot = workOnDraftFs(fs => {
        const fileToDelete = fs.getFileByPath(path);
        const parentFile = fs.getParent(fileToDelete);
        parentFile.deleteFile(fileToDelete.name);
      });

      setRoot(newRoot);
    } catch (err) {
      if (err instanceof FileSystemError) {
        console.error(err);
        return `cd: ${err.message}`;
      }

      throw err;
    }
  };

  const makeFileRelative = (
    path: string | Path,
    type: string,
    addEvenIfExists: boolean = false,
    content: any = [],
  ): string | void => {
    try {
      const newRoot = workOnDraftFs(fs => {
        const newDirPathAbsolute = fs.getAbsolutePathByRelativePath(path);
        const doesFileExist = fs.doesFileExist(newDirPathAbsolute);

        const newDirParentPath = newDirPathAbsolute.slice(0, -1);
        let newDirName = newDirPathAbsolute[newDirPathAbsolute.length - 1];
        const newDirParent = fs.getFileByPath(newDirParentPath);

        if (doesFileExist) {
          if (!addEvenIfExists) {
            throw new FileSystemError(`Directory ${newDirName} already exists`);
          }

          const copyNumber = newDirParent.getCopyNumberForNewAlreadyExistingChildFile(newDirName);
          newDirName += ` (${copyNumber})`;
        }

        newDirParent.addFile({ type, name: newDirName, content, isDirectory: true });
      });

      setRoot(newRoot);
    } catch (err) {
      if (err instanceof FileSystemError) {
        console.error(err);
        return `mkdir: ${err.message}`;
      }

      throw err;
    }
  };

  // @ts-ignore
  const listFiles = (p?: string | Path): File[] | string => {
    const path = p ?? location;

    try {
      const fs = new FileSystem(root, location);
      const file = fs.getFileByPath(path);

      if (!file.isDirectory) {
        throw new FileSystemError(`File ${FileSystem.getPathAsString(path)} is not a directory`);
      }

      return file.files;
    } catch (err) {
      if (err instanceof FileSystemError) {
        return `ls: ${err.message}`;
      }
    }
  };

  const getCurrentDirRef = (): File => {
    const fs = new FileSystem(root, location);
    return fs.getFileByPath(location);
  };

  const moveFileAbsolute = (curPath: string | Path, destPath: string | Path): string | void => {
    try {
      const newRoot = workOnDraftFs(fs => {
        if (fs.arePathsEqual(curPath, destPath)) {
          return;
        }

        const curFile = fs.getFileByPath(curPath);
        if (!curFile) {
          throw new FileSystemError(`File ${FileSystem.getPathAsString(curPath)} does not exist`);
        }

        const destParentPathAbs = fs.getParentPathByPath(destPath);
        const destParent = fs.getFileByPath(destParentPathAbs);
        const newFileName = destPath[destPath.length - 1];
        if (destParent.files.some(file => file.name === newFileName)) {
          throw new FileSystemError(`File ${newFileName} already exists`);
        }

        destParent.addFile({ ...curFile, name: newFileName });
        const curFileParent = fs.getParent(curFile);
        curFileParent.files = curFileParent.files.filter(file => file.name !== curFile.name);
      });

      setRoot(newRoot);
    } catch (err) {
      if (err instanceof FileSystemError) {
        console.error(err);
        return `mv: ${err.message}`;
      }

      throw err;
    }
  };

  const getFileRef = (path: string | Path): File => {
    const fs = new FileSystem(root, location);
    return fs.getFileByPath(path);
  };

  const saveFile = (path: string | Path, newContent: any): void => {
    const newRoot = workOnDraftFs(fs => {
      const file = fs.getFileByPath(path);
      file.content = newContent;
    });

    setRoot(newRoot);
  };

  return {
    location,
    changeDirectory,
    removeDirectory,
    makeFileRelative,
    listFiles,
    getCurrentDirRef,
    moveFileAbsolute,
    getFileRef,
    saveFile,
  };
};
