import { useEffect, useState } from 'react';
import { Binary } from 'interfaces/Binary';
import { useFsSession } from 'utils/providers/FSSessionProvider';

export const rm: Binary = ({ terminate, args, processCommandAsync }) => {
  terminate();

  if (args.length === 0) {
    processCommandAsync('help rm', 'rm');
    return null;
  }

  return () => {
    const { removeFile } = useFsSession();
    const [result, setResult] = useState<null | string>(null);

    useEffect(() => {
      const path = args?.join(' ')?.replace('\\ ', ' ');
      setResult(removeFile(path) ?? null);
    }, []);

    if (typeof result === 'string') {
      return <div>{result}</div>;
    }

    return null;
  };
};
