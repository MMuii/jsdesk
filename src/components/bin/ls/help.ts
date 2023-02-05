import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'ls - List all files and directories in current directory.',
  usage: 'ls',
  options: [
    {
      text: '--l',
      description: 'list all files and directories in current directory as vertical list',
    },
  ],
  examples: [
    { text: 'ls', description: 'list all files and directories in current directory' },
    { text: 'ls --l', description: 'list all files and directories as vertical list' },
  ],
};
