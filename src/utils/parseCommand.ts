import { Flags } from 'interfaces/BinProps';

class Cursor {
  str: string;
  pos: number;

  constructor(str: string, pos: number) {
    this.str = str;
    this.pos = pos;
  }

  private moveRight = (step = 1) => {
    this.pos += step;
  };

  public moveToNextParam = () => {
    const curStr = this.str.substring(this.pos);
    const flagMatch = /^(?<all> *--?(?<name>[a-zA-Z_][a-zA-Z0-9_]*)(=(?<value>[^-]*))?)/g.exec(
      curStr,
    );

    if (flagMatch) {
      let {
        // @ts-ignore
        groups: { all, name, value },
      } = flagMatch;

      if (value !== undefined) {
        value = value.trim();
        if (value.slice(0, 1) === '"' && value.slice(-1) === '"') {
          // string
          value = value.slice(1, -1);
        } else {
          // number or string (without '"')
          value = isNaN(Number(value)) ? String(value) : Number(value);
        }
      }

      this.moveRight(all.length);
      return {
        flag: {
          name,
          value: value ?? true,
        },
        arg: null,
      };
    }

    const arg = curStr.split(' ')[0];
    this.moveRight(arg.length + 1);
    return {
      flag: null,
      arg,
    };
  };
}

export const parseCommand = (str: string): { flags: Flags; args: string[] } => {
  const flags = {};
  const args = [];
  const cursor = new Cursor(str, 0);

  while (1) {
    const { flag, arg } = cursor.moveToNextParam();

    if (flag) {
      // @ts-ignore
      flags[flag.name] = flag.value;
    } else if (arg) {
      args.push(arg);
    }

    if (cursor.pos >= str.length) {
      break;
    }
  }

  return {
    flags,
    args,
  };
};
