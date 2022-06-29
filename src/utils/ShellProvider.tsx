import React, { useState, useContext, createContext, useRef, useCallback, useEffect } from 'react';
import bins from 'components/bin';
import { BinProps } from 'interfaces/BinProps';
import { TextLine } from 'components/TextLine';

interface ShellContextValue {
  history: Command[];
  processCommand: (command: string) => void;
  clearHistory: () => void;
  callStack: number[];
}

export interface Command {
  pid: number;
  time: Date;
  cmd: string;
  args: string[];
  terminate: () => void;
  output: React.FC<BinProps> | (() => JSX.Element);
}

interface Props {
  children: React.ReactNode;
}

type Executable = [string, React.FC<BinProps> | (() => JSX.Element)];

const ShellContext = createContext<ShellContextValue>({} as ShellContextValue);
export const useShell = () => useContext(ShellContext);

const programs: Array<Executable> = Object.entries(bins);

export const ShellProvider = ({ children }: Props) => {
  const [callStack, setCallStack] = useState<number[]>([0]);
  const [history, setHistory] = useState<Command[]>([]);
  const pid = useRef<number>(1);

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
          output: Program || ProgramNotFoundComponent,
        },
      ]);
    },
    [terminateProgram],
  );

  return (
    <ShellContext.Provider value={{ history, processCommand, callStack, clearHistory }}>
      {children}
    </ShellContext.Provider>
  );
};
