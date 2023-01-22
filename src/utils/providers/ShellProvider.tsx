import React, {
  useState,
  useContext,
  createContext,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import getBin from 'components/bin';
import { BinProps, RenderableProps } from 'interfaces/BinProps';
import { useTheme } from 'utils/hooks/useTheme';
import { Theme } from 'interfaces/Theme';
import { parseCommand } from 'utils/parseCommand';

interface ShellContextValue {
  history: Command[];
  renderHistory: Renderable[];
  processCommand: (
    command: string,
    renderedCommandName?: string,
    renderOnlyComponent?: boolean,
  ) => void;
  callStack: number[];
  theme: Theme;
}

export interface Command {
  pid: number;
  time: Date;
  cmd: string;
}

export interface Renderable {
  cmd: string | null;
  pid: number;
  time: Date;
  component: React.FC<RenderableProps>;
  args: BinProps;
}

export type Binary = (props: BinProps) => React.FC<RenderableProps> | null;

interface Props {
  children: React.ReactNode;
}

const ShellContext = createContext<ShellContextValue>({} as ShellContextValue);
export const useShell = () => useContext(ShellContext);

export const ShellProvider = ({ children }: Props) => {
  const [theme, setTheme] = useTheme();
  const [callStack, setCallStack] = useState<number[]>([0]);
  const [history, setHistory] = useState<Command[]>([]);
  const [renderHistory, setRenderHistory] = useState<Renderable[]>([]);
  const pid = useRef<number>(1);

  useEffect(() => {
    console.log('history:', history);
    console.log('renderHistory:', renderHistory);
    console.log('callStack:', callStack);
    console.log('________________________________');
  }, [history, renderHistory, callStack]);

  const clearHistory = useCallback(() => setRenderHistory([]), []);

  const terminateProgram = useCallback(() => {
    setCallStack(prev => {
      const next = [...prev];
      next.pop();
      return next;
    });
  }, []);

  const processCommand = useCallback(
    (command: string, renderedCommandName?: string, renderOnlyComponent: boolean = false) => {
      const { args, flags } = parseCommand(command);
      const programName = args[0];
      const executionTime = new Date();
      pid.current += 1;

      const program = getBin(programName);

      setCallStack(prev => [...prev, pid.current]);

      const programArgs: BinProps = {
        programName,
        terminate: terminateProgram,
        clearHistory,
        args: args.slice(1),
        flags,
        setTheme,
        processCommand,
        processCommandAsync,
        history,
      };

      const programOutput = program(programArgs);
      if (programOutput) {
        const cmd = renderOnlyComponent ? null : renderedCommandName ?? command;

        setRenderHistory(prev => [
          ...prev,
          {
            cmd,
            pid: pid.current,
            time: executionTime,
            component: programOutput,
            args: programArgs,
          },
        ]);
      }

      if (!renderOnlyComponent) {
        setHistory(prev => [
          ...prev,
          {
            pid: pid.current,
            time: executionTime,
            cmd: command,
          },
        ]);
      }
    },
    [terminateProgram, clearHistory, setTheme, history],
  );

  const processCommandAsync = useCallback(
    (
      command: string,
      renderedCommandName?: string,
      renderOnlyComponent: boolean = false,
      timeout: number = 0,
    ) => {
      setTimeout(() => {
        processCommand(command, renderedCommandName, renderOnlyComponent);
      }, timeout);
    },
    [processCommand],
  );

  return (
    <ShellContext.Provider value={{ history, processCommand, callStack, renderHistory, theme }}>
      {children}
    </ShellContext.Provider>
  );
};
