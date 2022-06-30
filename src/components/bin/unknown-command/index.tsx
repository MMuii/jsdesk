import React from 'react';
import { Binary } from 'utils/ShellProvider';

export const unknownCommand: Binary = ({ programName, terminate }) => {
  terminate();
  return () => <div>Unknown command {programName}</div>;
};
