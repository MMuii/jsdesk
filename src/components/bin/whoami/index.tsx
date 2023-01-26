import { Binary } from 'interfaces/Binary';

export const whoami: Binary = ({ terminate }) => {
  terminate();
  return () => <div>guest</div>;
};
