import { Binary } from 'interfaces/Binary';
import React from 'react';

export const date: Binary = ({ terminate }) => {
  terminate();
  const date = new Date().toLocaleString();
  return () => <div>{date}</div>;
};
