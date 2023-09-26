import { useEffect, useState } from 'react';
import { Binary } from 'interfaces/Binary';
import { useFsSession } from 'utils/providers/FSSessionProvider';

export const cd: Binary = ({ terminate, args }) => {
  terminate();

  return () => {
    const { changeDirectory } = useFsSession();
    const [result, setResult] = useState<null | string>(null);

    useEffect(() => {
      if (args.length > 0) {
        const path = args?.join(' ')?.replace('\\ ', ' ');
        setResult(changeDirectory(path) ?? null);
      }
    }, []);

    if (typeof result === 'string') {
      return <div>{result}</div>;
    }

    return null;
  };
};
