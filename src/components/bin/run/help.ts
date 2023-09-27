import { CommandHelp } from 'interfaces/CommandHelp';

export const help: CommandHelp = {
  name: 'run - evaluates JavaScript code',
  usage: 'run [JavaScript code]',
  examples: [
    {
      text: 'run "const foo = 2; foo;"',
      description: 'Evaluates given code and prints "foo" variable value.',
    },
    {
      text: 'run "console.log("logging from repl!");"',
      description: 'Evaluates given code and logs to console.',
    },
  ],
};
