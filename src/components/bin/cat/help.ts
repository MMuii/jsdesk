import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'cat - Prints a random photo picturing some really nice cat.',
  usage: 'cat',
  options: [
    { text: '--h / --height', description: 'height of an image' },
    {
      text: '--say',
      description: 'text that cat will say',
    },
  ],
  examples: [
    { text: 'cat --h=300', description: 'displays cat image of 300px tall' },
    {
      text: 'cat --h=300 --say="meow"',
      description: 'displays cat image of 300px tall and saying "meow"',
    },
  ],
};
