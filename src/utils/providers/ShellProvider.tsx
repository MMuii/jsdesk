import React, { useState, useContext, createContext, useRef, useCallback, useEffect } from "react";
import getBin from 'components/bin';
import { BinProps, RenderableProps } from 'interfaces/BinProps';
import { useTheme } from 'utils/hooks/useTheme';
import { Theme } from 'interfaces/Theme';
import { parseCommand } from 'utils/parseCommand';

interface ShellContextValue {
  history: Command[];
  renderHistory: Renderable[];
  processCommand: (command: string) => void;
  callStack: number[];
  theme: Theme;
}

export interface Command {
  pid: number;
  time: Date;
  cmd: string;
}

export interface Renderable {
  cmd: string;
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

  const clearHistory = useCallback(() => setRenderHistory([]), []);

  const terminateProgram = useCallback(() => {
    setCallStack(prev => {
      const next = [...prev];
      next.pop();
      return next;
    });
  }, []);

  const processCommand = useCallback(
    (command: string, renderedCommandName?: string) => {
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
        history
      };

      const programOutput = program(programArgs);
      if (programOutput) {
        setRenderHistory(prev => [
          ...prev,
          {
            cmd: renderedCommandName ?? command,
            pid: pid.current,
            time: executionTime,
            component: programOutput,
            args: programArgs,
          },
        ]);
      }

      setHistory(prev => [
        ...prev,
        {
          pid: pid.current,
          time: executionTime,
          cmd: command,
        },
      ]);
    },
    [terminateProgram, clearHistory, setTheme],
  );

  // useEffect(() => {
  //   console.log('history:', history);
  // }, [history]);


  return (
    <ShellContext.Provider value={{ history, processCommand, callStack, renderHistory, theme }}>
      {children}
    </ShellContext.Provider>
  );
};
