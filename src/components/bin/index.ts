import { theme } from 'components/bin/theme/theme';
import { unknownCommand } from 'components/bin/unknown-command';
import { clear } from 'components/bin/clear';
import { Binary } from 'utils/ShellProvider';

const bins: { [key: string]: Binary } = {
  theme: theme,
  clear: clear,
};

export default function getBin(name: string): Binary {
  return bins[name] || unknownCommand;
}
