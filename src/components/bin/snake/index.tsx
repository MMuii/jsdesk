import { Binary } from 'utils/providers/ShellProvider';
import { Snake } from 'components/bin/snake/Snake';

export const snake: Binary = binProps => {
  return renderableProps => <Snake {...binProps} {...renderableProps} />;
};
