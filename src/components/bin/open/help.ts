import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'open - opens a file in default program',
  usage: 'open [file path]',
  examples: [
    { text: 'open ./documents/image.jpg', description: 'opens the image.jpg image' },
    { text: 'open README.txt', description: 'opens the README.txt file' },
  ],
};
