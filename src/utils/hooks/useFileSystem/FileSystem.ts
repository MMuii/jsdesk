import { immerable } from 'immer';
import { File, FileType } from './File';
import { FileSystemError } from './FileSystemError';

export type Path = string[];

export class FileSystem {
  [immerable] = true;
  root: File;
  location: Path;

  constructor(root: File, location: Path) {
    this.root = root;
    this.location = location;
  }

  public getParent(file: File): File {
    if (file === this.root) {
      return this.root;
    }

    const parentPath = file.path.slice(0, -1);
    return this.getFileByPath(parentPath);
  }

  public getParentPathByPath(p: string | Path): Path {
    const path = this.parsePath(p);
    return path.slice(0, -1);
  }

  public getFileByPath(p: string | Path): File {
    const path = this.parsePath(p);
    let fileRef: File = this.root;

    path.slice(1).forEach(dir => {
      const nextRef = fileRef.files.find(file => file.name === dir);
      if (!nextRef) {
        throw new FileSystemError(`No such file or directory: ${FileSystem.getPathAsString(path)}`);
      }

      fileRef = nextRef;
    });

    return fileRef;
  }

  public doesFileExist(p: string | Path): boolean {
    const path = this.parsePath(p);

    try {
      this.getFileByPath(path);
    } catch (err) {
      if (err instanceof FileSystemError) {
        return false;
      }
    }

    return true;
  }

  public arePathsEqual(path1: string | Path, path2: string | Path): boolean {
    const p1 = this.parsePath(path1);
    const p2 = this.parsePath(path2);
    return p1.join('/') === p2.join('/');
  }

  public getAbsolutePathByRelativePath(path: string | Path): Path {
    return this.parsePath(path);
  }

  private getAbsolutePathFromRelative(relativePath: Path): Path {
    const absPath = [...this.location];

    relativePath.forEach(dirName => {
      if (dirName === '..') {
        if (absPath.length > 1) {
          absPath.pop();
        }
      } else {
        absPath.push(dirName);
      }
    });

    return absPath;
  }

  private parsePath(path: string | Path): Path {
    if (typeof path === 'object') {
      return this.parseArrayPath(path);
    }

    return this.parseStringPath(path);
  }

  private parseArrayPath(path: Path): Path {
    const isAbsolute = path[0] === '/';
    if (isAbsolute) {
      return path;
    }

    return this.getAbsolutePathFromRelative(path);
  }

  private parseStringPath(path: string): Path {
    if (path === '/') {
      return ['/'];
    }

    const isAbsolute = path[0] === '/';
    const arrPath = isAbsolute ? ['/', ...path.slice(1).split('/')] : path.split('/');
    if (isAbsolute) {
      return arrPath;
    }

    return this.getAbsolutePathFromRelative(arrPath);
  }

  public static getPathAsString(path: string | Path): string {
    if (typeof path === 'string') {
      return path;
    }

    return '/' + path.slice(1).join('/');
  }

  public static parseRoot(jsonRoot: FileType): File {
    const root = new File({ ...jsonRoot });
    root.files = root.files.map(jsonFile => this.parseFileFromJSONFile(jsonFile));
    return root;
  }

  private static parseFileFromJSONFile(jsonFile: FileType): File {
    const file = new File({ ...jsonFile });
    file.files = file.files.map(jsonFile => this.parseFileFromJSONFile(jsonFile));
    return file;
  }
}
