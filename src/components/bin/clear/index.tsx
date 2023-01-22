import React from 'react';
import { Binary } from 'utils/providers/ShellProvider';

export const clear: Binary = ({ terminate, clearHistory }) => {
  console.log('cleaning history');
  clearHistory();
  terminate();
  return null;
};
