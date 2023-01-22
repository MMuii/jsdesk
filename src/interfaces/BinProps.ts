import { Command } from 'utils/providers/ShellProvider';

export type Flags = { [key: string]: any };

export interface BinProps {
  programName: string;
  args: string[];
  flags: Flags;
  terminate: () => void;
  clearHistory: () => void;
  setTheme: (theme: string) => boolean;
  processCommand: (
    command: string,
    renderedCommandName?: string,
    renderOnlyComponent?: boolean,
  ) => void;
  processCommandAsync: (
    command: string,
    renderedCommandName?: string,
    renderOnlyComponent?: boolean,
    timeout?: number,
  ) => void;
  history: Command[];
}

export interface RenderableProps extends BinProps {
  isFocused: boolean;
}
