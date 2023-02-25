export class FileSystemError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileSystemError';
  }
}
