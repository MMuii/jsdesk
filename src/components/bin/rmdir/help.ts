import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'rmdir - Remove directory with all of its files and directories.',
  usage: 'rmdir [dir path]',
  examples: [
    { text: 'rmdir images', description: 'remove directory named "images"' },
    {
      text: 'rmdir ../../documents',
      description: 'remove directory named "documents" by relative path',
    },
  ],
};
