import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'cd - Change directory',
  usage: 'cd [dir path]',
  examples: [
    { text: 'cd images', description: 'change directory to "images"' },
    { text: 'cd ../../documents', description: 'change directory to "documents" by relative path' },
  ],
};
