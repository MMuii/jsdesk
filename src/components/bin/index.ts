import { theme } from 'components/bin/theme/theme';
import { unknownCommand } from 'components/bin/unknown-command';
import { clear } from 'components/bin/clear';
import { CommandHelp } from 'interfaces/CommandHelp';
import { whoami } from 'components/bin/whoami';
import { neofetch } from 'components/bin/neofetch';
import { help } from 'components/bin/help';
import { date } from 'components/bin/date';
import { cat } from 'components/bin/cat';
import { about } from 'components/bin/about';
import { history } from 'components/bin/history';
import { pickerTest } from 'components/picker-test';
import { snake } from 'components/bin/snake';
import { pwd } from 'components/bin/pwd';
import { ls } from 'components/bin/ls';
import { mkdir } from 'components/bin/mkdir';
import { rmdir } from 'components/bin/rmdir';
import { cd } from 'components/bin/cd';
import { help as clearHelp } from 'components/bin/clear/help';
import { help as helpHelp } from 'components/bin/help/help';
import { help as neofetchHelp } from 'components/bin/neofetch/help';
import { help as themeHelp } from 'components/bin/theme/help';
import { help as whoamiHelp } from 'components/bin/whoami/help';
import { help as dateHelp } from 'components/bin/date/help';
import { help as catHelp } from 'components/bin/cat/help';
import { help as rmdirHelp } from 'components/bin/rmdir/help';
import { help as pwdHelp } from 'components/bin/pwd/help';
import { help as lsHelp } from 'components/bin/ls/help';
import { help as cdHelp } from 'components/bin/cd/help';
import { help as mkdirHelp } from 'components/bin/mkdir/help';
import { Binary } from 'interfaces/Binary';

export const bins: { [key: string]: Binary } = {
  theme: theme,
  clear: clear,
  whoami: whoami,
  neofetch: neofetch,
  help: help,
  date: date,
  cat: cat,
  about: about,
  history: history, // TODO - add help
  pickerTest: pickerTest, // TODO - do wywalenia
  snake: snake, // TODO - add help
  pwd: pwd,
  ls: ls,
  mkdir: mkdir,
  rmdir: rmdir,
  cd: cd,
};

export const helpPages: { [key: string]: CommandHelp } = {
  clear: clearHelp,
  help: helpHelp,
  neofetch: neofetchHelp,
  theme: themeHelp,
  whoami: whoamiHelp,
  date: dateHelp,
  cat: catHelp,
  rmdir: rmdirHelp,
  mkdir: mkdirHelp,
  pwd: pwdHelp,
  ls: lsHelp,
  cd: cdHelp,
};

export function getHelpPage(name: string): CommandHelp | undefined {
  return helpPages[name];
}

export default function getBin(name: string): Binary {
  return bins[name] || unknownCommand;
}
