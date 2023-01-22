import React from 'react';
import { Binary } from 'utils/providers/ShellProvider';

export const whoami: Binary = ({ terminate }) => {
  terminate();
  return () => <div>guest</div>;
};
