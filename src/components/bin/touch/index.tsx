import { useEffect, useState } from 'react';
import { Binary } from 'interfaces/Binary';
import { useFsSession } from 'utils/providers/FSSessionProvider';

export const touch: Binary = ({ terminate, args, processCommandAsync }) => {
  terminate();

  if (args.length === 0) {
    processCommandAsync('help touch', 'touch');
    return null;
  }

  return () => {
    const { makeFileRelative } = useFsSession();
    const [result, setResult] = useState<null | string>(null);

    useEffect(() => {
      setResult(makeFileRelative(args[0], 'txt', true, '', false) ?? null);
    }, []);

    if (typeof result === 'string') {
      return <div>{result}</div>;
    }

    return null;
  };
};
