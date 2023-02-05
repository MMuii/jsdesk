import { Binary } from 'interfaces/Binary';

export const date: Binary = ({ terminate }) => {
  terminate();
  const date = new Date().toLocaleString();
  return () => <div>{date}</div>;
};
