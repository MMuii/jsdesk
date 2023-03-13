import { useEffect, useState } from 'react';
import { useWindowManagerContext } from 'components/Desktop';
import { Binary } from 'interfaces/Binary';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { getDefaultWindowByFileType } from 'utils/fs/getDefaultWindowByFileType';
import { FileSystemError } from 'utils/hooks/useFileSystem/FileSystemError';

export const open: Binary = ({ terminate, args, processCommandAsync }) => {
  terminate();

  if (args.length === 0) {
    processCommandAsync('help open', 'open');
    return null;
  }

  return () => {
    const { getFileRef } = useFsSession();
    const { openWindow } = useWindowManagerContext();
    const [result, setResult] = useState<null | string>(null);

    useEffect(() => {
      try {
        const fileRef = getFileRef(args[0]);
        const window = getDefaultWindowByFileType(fileRef);
        openWindow(window);
      } catch (err) {
        if (err instanceof FileSystemError) {
          setResult(err.message);
        }
      }
    }, []);

    if (typeof result === 'string') {
      return <div>{result}</div>;
    }

    return null;
  };
};
