import React, { useEffect } from 'react';
import { useShell } from 'utils/ShellProvider';
import { BinProps } from 'interfaces/BinProps';

export const Clear: React.FC<BinProps> = ({ terminate, clearHistory }) => {
  useEffect(() => {
    clearHistory();
    terminate();
  }, []);

  return null;
};
