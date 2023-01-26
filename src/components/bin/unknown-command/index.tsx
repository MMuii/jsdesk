import { Binary } from 'interfaces/Binary';

export const unknownCommand: Binary = ({ programName, terminate }) => {
  terminate();
  return () => <div>Unknown command {programName}</div>;
};
