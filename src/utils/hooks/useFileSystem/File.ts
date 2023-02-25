import { immerable } from 'immer';
import { Path } from 'interfaces/fs';
import { FileSystemError } from './FileSystemError';

type CreateFileObject = {
  type: string;
  name: string;
  isDirectory: boolean;
  content: any;
  path: Path;
  files?: any;
};

export interface JSONFile {
  files: JSONFile[];
  type: string;
  updatedAt: string;
  name: string;
  isDirectory: boolean;
  content: any;
  path: Path;
}

export class File {
  [immerable] = true;
  files: File[];
  type: string;
  updatedAt: string;
  name: string;
  isDirectory: boolean;
  content: any;
  path: Path;

  constructor({ type, name, isDirectory, content, files, path }: CreateFileObject) {
    this.type = type;
    this.name = name;
    this.isDirectory = isDirectory;
    this.updatedAt = new Date().toISOString();
    this.files = files ?? [];
    this.content = content;
    this.path = path;
  }

  public addFile({ type, name, isDirectory, content }: Omit<CreateFileObject, 'path'>): File {
    if (!this.isDirectory) {
      throw new FileSystemError(`File ${this.name} is not a directory.`);
    }

    const newFile = new File({ type, name, isDirectory, content, path: [...this.path, name] });
    this.files.push(newFile);
    console.log('new file:', newFile);
    return newFile;
  }

  public deleteFile(name: string) {
    const fileToDeleteIndex = this.files.findIndex(file => file.name === name);
    if (fileToDeleteIndex === -1) {
      throw new FileSystemError(`No such file or directory: ${name}`);
    }

    this.files = this.files.filter(file => file.name !== name);
  }

  public getCopyNumberForNewAlreadyExistingChildFile(filename: string): number {
    const regexp = new RegExp(`${filename} \\((?<copyNumber>[0-9]+)\\)`);
    const copyNumbers = this.files
      .map(file => file.name)
      .reduce((numbers, fname) => {
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
  }
}
