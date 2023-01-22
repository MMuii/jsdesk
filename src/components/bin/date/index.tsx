import React from 'react';
import { Binary } from 'utils/providers/ShellProvider';

export const date: Binary = ({ terminate }) => {
  terminate();
  const date = new Date().toLocaleString();
  return () => <div>{date}</div>;
};
