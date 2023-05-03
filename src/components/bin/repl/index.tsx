import { Binary } from 'interfaces/Binary';
import { Repl } from './Repl';

export const repl: Binary = binProps => {
  return renderableProps => <Repl {...binProps} {...renderableProps} />;
};
