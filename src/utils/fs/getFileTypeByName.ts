export const getFileTypeByName = (filename: string): string => {
  const splitted = filename.split('.');

  // file has no extension
  if (splitted.length === 1) {
    return 'txt';
  }

  return splitted[splitted.length - 1];
};
