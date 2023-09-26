import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'rm - Remove file.',
  usage: 'rm [file path]',
  examples: [
    { text: 'rm document.txt', description: 'remove file named "document"' },
    {
      text: 'rm ../../document.txt',
      description: 'remove file named "document.txt" by relative path',
    },
  ],
};
