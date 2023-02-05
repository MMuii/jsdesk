import { useEffect, useState } from 'react';
import { Binary } from 'interfaces/Binary';
import { useFs } from 'utils/providers/FSProvider';

export const rmdir: Binary = ({ terminate, args, processCommandAsync }) => {
  terminate();

  if (args.length === 0) {
    processCommandAsync('help rmdir', 'rmdir');
    return null;
  }

  return () => {
    const { removeDirectory } = useFs();
    const [result, setResult] = useState<null | string>(null);

    useEffect(() => {
      setResult(removeDirectory(args[0]));
    }, []);

    if (typeof result === 'string') {
      return <div>{result}</div>;
    }

    return null;
  };
};
