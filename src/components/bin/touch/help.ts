import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'touch - Create new file.',
  usage: 'touch [file name]',
  examples: [{ text: 'touch mydoc.txt', description: 'create text file named mydoc.txt' }],
};
