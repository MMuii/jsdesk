import { Snake } from 'components/bin/snake/Snake';
import { Binary } from 'interfaces/Binary';

export const snake: Binary = binProps => {
  return renderableProps => <Snake {...binProps} {...renderableProps} />;
};
