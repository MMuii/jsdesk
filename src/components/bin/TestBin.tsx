import React from 'react';
import { BinProps } from 'interfaces/BinProps';

export const TestBin: React.FC<BinProps> = ({ args }) => {
  return (
    <div style={{ color: 'red' }}>
      Program has been executed with args: {args}
    </div>
  );
};
