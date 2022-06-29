import React, { useState, useContext, createContext, useRef, useCallback, useEffect } from 'react';
import bins from 'components/bin';
import { BinProps } from 'interfaces/BinProps';
import { TextLine } from 'components/TextLine';

interface ShellContextValue {
  history: Command[];
  processCommand: (command: string) => void;
  callStack: number[];
}

export interface Command {
  pid: number;
  time: Date;
  cmd: string;
  args: string[];
  terminate: () => void;
  clearHistory: () => void;
  output: React.FC<BinProps>;
}

interface Props {
  children: React.ReactNode;
}

type Executable = [string, React.FC<BinProps>];

const ShellContext = createContext<ShellContextValue>({} as ShellContextValue);
export const useShell = () => useContext(ShellContext);

const programs: Array<Executable> = Object.entries(bins);

export const ShellProvider = ({ children }: Props) => {
  const [callStack, setCallStack] = useState<number[]>([0]);
  const [history, setHistory] = useState<Command[]>([]);
  const pid = useRef<number>(1);

  useEffect(() => {
    console.log('history:', history);
  }, [history]);

  // useEffect(() => {
  //   console.log('Callstack:', callStack);
  // }, [callStack]);

  const clearHistory = useCallback(() => setHistory([]), []);

  const terminateProgram = useCallback(() => {
    setCallStack(prev => {
      const next = [...prev];
      next.pop();
      return next;
    });
  }, []);

  const processCommand = useCallback(
    (command: string) => {
      const [programName, ...args] = command.split(' ');

      const ProgramNotFoundComponent = () => <TextLine>Unknown command {programName}</TextLine>;
      const Program = programs.find(([name]) => name === programName)?.[1];

      pid.current += 1;

      if (Program) {
        setCallStack(prev => [...prev, pid.current]);
      }

      setHistory(prev => [
        ...prev,
        {
          pid: pid.current,
          time: new Date(),
          cmd: command,
          args,
          terminate: terminateProgram,
          clearHistory,
          output: Program || ProgramNotFoundComponent,
        },
      ]);
    },
    [terminateProgram, clearHistory],
  );

  return (
    <ShellContext.Provider value={{ history, processCommand, callStack }}>
      {children}
    </ShellContext.Provider>
  );
};
