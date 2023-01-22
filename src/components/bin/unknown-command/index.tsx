import React from 'react';
import { Binary } from 'utils/providers/ShellProvider';

export const unknownCommand: Binary = ({ programName, terminate }) => {
  terminate();
  return () => <div>Unknown command {programName}</div>;
};
