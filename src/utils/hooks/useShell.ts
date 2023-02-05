import { useAppTheme } from './../providers/ThemeProvider';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BinProps } from 'interfaces/BinProps';
import { parseCommand } from 'utils/parseCommand';
import getBin from 'components/bin';
import { Command } from 'interfaces/Command';
import { Renderable } from 'interfaces/Renderable';

export const useShell = () => {
  const [appTheme, setAppTheme] = useAppTheme();
  const [callStack, setCallStack] = useState<number[]>([0]);
  const [history, setHistory] = useState<Command[]>([]);
  const [renderHistory, setRenderHistory] = useState<Renderable[]>([]);
  const pid = useRef<number>(1);

  // useEffect(() => {
  //   console.log('history:', history);
  //   console.log('renderHistory:', renderHistory);
  //   console.log('callStack:', callStack);
  //   console.log('________________________________');
  // }, [history, renderHistory, callStack]);

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
        setTheme: setAppTheme,
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
    [terminateProgram, clearHistory, setAppTheme, history],
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

  return { history, processCommand, callStack, renderHistory, theme: appTheme };
};
