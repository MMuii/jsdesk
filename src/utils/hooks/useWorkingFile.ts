import { useEffect, useState } from 'react';
import { Path } from 'utils/hooks/useFileSystem/FileSystem';
import { File } from 'utils/hooks/useFileSystem/File';
import { useFileSystem } from 'utils/hooks/useFileSystem';

export const useWorkingFile = (initialFilePath?: Path) => {
  const [workingFilePath, setWorkingFilePath] = useState(initialFilePath);
  const [workingFileRef, setWorkingFileRef] = useState<File | null>(null);
  const { getFileRef } = useFileSystem();

  useEffect(() => {
    if (!workingFilePath) {
      return;
    }

    const ref = getFileRef(workingFilePath);
    setWorkingFileRef(ref);
  }, [workingFilePath, getFileRef]);

  return { setWorkingFilePath, workingFile: workingFileRef };
};
