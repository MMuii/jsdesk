import React, { useEffect, useState } from 'react';
import { BinProps } from 'interfaces/BinProps';

export const Counter: React.FC<BinProps> = ({ args }) => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log('Picker działa');
  }, []);

  return (
    <div>
      <button onClick={() => setCounter(prev => prev + 1)}>increment</button>
      <div>counter: {counter}</div>
    </div>
  );
};
