import { useEffect, useState } from 'react';
import { Binary } from 'interfaces/Binary';
import { useFsSession } from 'utils/providers/FSSessionProvider';

export const mkdir: Binary = ({ terminate, args, processCommandAsync }) => {
  terminate();

  if (args.length === 0) {
    processCommandAsync('help mkdir', 'mkdir');
    return null;
  }

  return () => {
    const { makeDirectory } = useFsSession();
    const [result, setResult] = useState<null | string>(null);

    useEffect(() => {
      setResult(makeDirectory(args[0]));
    }, []);

    if (typeof result === 'string') {
      return <div>{result}</div>;
    }

    return null;
  };
};
