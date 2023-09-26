import { theme } from 'components/bin/theme/theme';
import { unknownCommand } from 'components/bin/unknown-command';
import { clear } from 'components/bin/clear';
import { CommandHelp } from 'interfaces/CommandHelp';
import { whoami } from 'components/bin/whoami';
import { neofetch } from 'components/bin/neofetch';
import { help } from 'components/bin/help';
import { date } from 'components/bin/date';
import { catto } from 'components/bin/catto';
import { cat } from 'components/bin/cat';
import { about } from 'components/bin/about';
import { history } from 'components/bin/history';
import { pickerTest } from 'components/picker-test';
import { snake } from 'components/bin/snake';
import { pwd } from 'components/bin/pwd';
import { ls } from 'components/bin/ls';
import { mkdir } from 'components/bin/mkdir';
import { rmdir } from 'components/bin/rmdir';
import { rm } from 'components/bin/rm';
import { cd } from 'components/bin/cd';
import { touch } from 'components/bin/touch';
import { open } from 'components/bin/open';
import { repl } from 'components/bin/repl';
import { run } from 'components/bin/run';
import { help as clearHelp } from 'components/bin/clear/help';
import { help as helpHelp } from 'components/bin/help/help';
import { help as neofetchHelp } from 'components/bin/neofetch/help';
import { help as themeHelp } from 'components/bin/theme/help';
import { help as whoamiHelp } from 'components/bin/whoami/help';
import { help as dateHelp } from 'components/bin/date/help';
import { help as cattoHelp } from 'components/bin/catto/help';
import { help as rmdirHelp } from 'components/bin/rmdir/help';
import { help as pwdHelp } from 'components/bin/pwd/help';
import { help as lsHelp } from 'components/bin/ls/help';
import { help as cdHelp } from 'components/bin/cd/help';
import { help as mkdirHelp } from 'components/bin/mkdir/help';
import { help as touchHelp } from 'components/bin/touch/help';
import { help as rmHelp } from 'components/bin/rm/help';
import { Binary } from 'interfaces/Binary';

export const bins: { [key: string]: Binary } = {
  theme: theme,
  clear: clear,
  whoami: whoami,
  neofetch: neofetch,
  help: help,
  date: date,
  catto: catto,
  cat: cat, // TODO - add help
  about: about,
  history: history, // TODO - add help
  pickerTest: pickerTest, // TODO - do wywalenia
  snake: snake, // TODO - add help
  pwd: pwd,
  ls: ls,
  mkdir: mkdir,
  rmdir: rmdir,
  rm: rm,
  cd: cd,
  touch: touch,
  open: open, // TODO - add help
  repl: repl, // TODO - add help
  run: run, // TODO - add help
};

export const helpPages: { [key: string]: CommandHelp } = {
  clear: clearHelp,
  help: helpHelp,
  neofetch: neofetchHelp,
  theme: themeHelp,
  whoami: whoamiHelp,
  date: dateHelp,
  cat: cattoHelp,
  rmdir: rmdirHelp,
  rm: rmHelp,
  mkdir: mkdirHelp,
  pwd: pwdHelp,
  ls: lsHelp,
  cd: cdHelp,
  touch: touchHelp,
};

export function getHelpPage(name: string): CommandHelp | undefined {
  return helpPages[name];
}

export default function getBin(name: string): Binary {
  return bins[name] || unknownCommand;
}
