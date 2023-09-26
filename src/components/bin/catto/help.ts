import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'catto - Prints a random photo picturing some really nice cat.',
  usage: 'catto',
  options: [
    { text: '--h / --height', description: 'height of an image' },
    {
      text: '--say',
      description: 'text that cat will say',
    },
  ],
  examples: [
    { text: 'catto --h=300', description: 'displays cat image of 300px tall' },
    {
      text: 'catto --h=300 --say="meow"',
      description: 'displays cat image of 300px tall and saying "meow"',
    },
  ],
};
