import { useState } from 'react';
import { Path } from 'utils/hooks/useFileSystem/FileSystem';
import { File } from 'utils/hooks/useFileSystem/File';
import { useFileSystem } from 'utils/hooks/useFileSystem';

export const useWorkingFile = (initialFileRef?: File) => {
  const [workingFileRef, setWorkingFileRef] = useState<File | null>(initialFileRef ?? null);
  const { getFileRef } = useFileSystem();

  const setWorkingFile = (path: Path) => {
    const ref = getFileRef(path);
    setWorkingFileRef(ref);
  };

  return { setWorkingFile, workingFile: workingFileRef };
};
