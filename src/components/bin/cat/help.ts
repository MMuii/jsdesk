import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'cat - prints file content to the console',
  usage: 'cat [file path]',
  examples: [
    { text: 'cat ./documents/notes.txt', description: 'prints content of "notes.txt" file' },
    { text: 'cat README.txt', description: 'prints content of "README.txt" file' },
  ],
};
