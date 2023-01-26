import { Binary } from 'interfaces/Binary';

export const clear: Binary = ({ terminate, clearHistory }) => {
  clearHistory();
  terminate();
  return null;
};
