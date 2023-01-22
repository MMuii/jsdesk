export type HelpOption = { text: string; description: string };

export interface CommandHelp {
  name: string;
  usage: string;
  args?: HelpOption[];
  options?: HelpOption[];
  examples?: HelpOption[];
}
