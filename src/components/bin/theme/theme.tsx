import React from 'react';
import { Binary } from 'utils/ShellProvider';

export const theme: Binary = ({ args, terminate, setTheme }) => {
  const theme = args[0];

  if (setTheme(theme)) {
    terminate();
    return () => <div>Theme set to {theme}</div>;
  }

  terminate();
  return () => <div>Theme {theme} not found</div>;
};
