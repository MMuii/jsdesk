import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'theme - Changes theme of the terminal.',
  usage: 'theme [arg]',
  args: [
    { text: 'ls [--l] [--c / --color]', description: 'list all available themes' },
    { text: 'set [theme name]', description: 'set set a theme' },
    { text: 'random', description: 'set a random theme' },
  ],
  options: [
    { text: '--l', description: 'displays list of all available themes in a vertical list' },
    {
      text: '--c / --color',
      description: 'displays list of all available themes with color preview',
    },
  ],
  examples: [
    { text: 'theme ls', description: 'list all themes' },
    { text: 'theme ls -c', description: 'list all themes with color preview' },
    { text: 'theme set monokai-pro', description: 'set theme to monokai-pro' },
    { text: 'theme random', description: 'set theme to random theme' },
  ],
};
