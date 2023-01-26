import { Binary } from 'interfaces/Binary';
import { useEffect, useState } from 'react';

const Counter = ({ terminate }: { terminate: any }) => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'q') {
        terminate();
        document.removeEventListener('keydown', handler);
      } else if (e.key === 'p') {
        setCounter(prev => prev + 1);
      }
    };

    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, []);

  return <div>Counter is: {counter}. Q to quit, P to add one</div>;
};

export const pickerTest: Binary = ({ terminate }) => {
  return () => <Counter terminate={terminate} />;
};
