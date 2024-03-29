import { useEffect, useState } from 'react';
import { Binary } from 'interfaces/Binary';
import { useFsSession } from 'utils/providers/FSSessionProvider';

export const rmdir: Binary = ({ terminate, args, processCommandAsync }) => {
  terminate();

  if (args.length === 0) {
    processCommandAsync('help rmdir', 'rmdir');
    return null;
  }

  return () => {
    const { removeDirectory } = useFsSession();
    const [result, setResult] = useState<null | string>(null);

    useEffect(() => {
      const path = args?.join(' ')?.replace('\\ ', ' ');
      setResult(removeDirectory(path) ?? null);
    }, []);

    if (typeof result === 'string') {
      return <div>{result}</div>;
    }

    return null;
  };
};
