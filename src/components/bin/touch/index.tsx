import { useEffect, useState } from 'react';
import { Binary } from 'interfaces/Binary';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { getFileTypeByName } from 'utils/fs/getFileTypeByName';

export const touch: Binary = ({ terminate, args, processCommandAsync }) => {
  terminate();

  if (args.length === 0) {
    processCommandAsync('help touch', 'touch');
    return null;
  }

  return () => {
    const { makeFileRelative } = useFsSession();
    const [result, setResult] = useState<null | string>(null);

    const path = args?.join(' ')?.replace('\\ ', ' ');
    const fileType = getFileTypeByName(path);

    useEffect(() => {
      setResult(makeFileRelative(path, fileType, true, '', false) ?? null);
    }, []);

    if (typeof result === 'string') {
      return <div>{result}</div>;
    }

    return null;
  };
};
