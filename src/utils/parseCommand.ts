import { Flags } from 'interfaces/BinProps';
import minimist from 'minimist';

const createArgv = (input: string): string[] => {
  // Split the input string by spaces, considering quoted substrings as a single argument
  const regex = /[^\s"]+|"([^"]*)"/gi;
  const args: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    // Extract the matched argument and remove surrounding quotes if present
    const arg = match[1] ? match[1] : match[0];
    args.push(arg);
  }

  return args;
};

export const parseCommand = (command: string): { flags: Flags; args: string[] } => {
  const argv = createArgv(command);
  const parsed = minimist(argv);

  const result = {
    flags: {
      ...parsed,
    },
    args: parsed._,
  };

  // @ts-ignore
  delete result.flags._;

  return result;
};
