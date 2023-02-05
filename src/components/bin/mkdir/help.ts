import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'mkdir - Create new directory.',
  usage: 'mkdir [dir path]',
  examples: [
    { text: 'mkdir images', description: 'create directory named "images"' },
    {
      text: 'mkdir ../../documents',
      description: 'create directory "documents" relatively to current directory',
    },
  ],
};
