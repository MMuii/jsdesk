import React from 'react';
import { useShell } from 'utils/ShellProvider';

export const Clear: () => JSX.Element = () => {
  const { clearHistory } = useShell();

  return <></>;
};
