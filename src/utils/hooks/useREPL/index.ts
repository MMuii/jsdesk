import { useEffect, useRef, useState } from 'react';
import { Output, REPLScope } from './types';
import { getScopeMutations } from './getScopeMutations';
import { evalScript, getScopeInjectionScript, updateScope } from './utils';

const initialOutput: Output[] = [
  { text: '// To leave REPL, press CTRL+C', type: 'log' },
  { text: '// Scope is preserved between evaluations by evaluating', type: 'log' },
  { text: '// all the variable declarations and assignments every new input.', type: 'log' },
];

export const useREPL = () => {
  const [output, setOutput] = useState<Output[]>(initialOutput);
  const scopeRef = useRef<REPLScope>({});

  useEffect(() => {
    const originalConsoleLog = console.log;

    console.log = (msg: string) => {
      setOutput(prev => [...prev, { text: msg, type: 'log' }]);
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  const parseScript = (script: string) => {
    setOutput(prev => [...prev, { text: script, type: 'input' }]);

    try {
      const scopeInjectionScript = getScopeInjectionScript(scopeRef.current);

      const scriptWithInjectedScope = `${scopeInjectionScript} ${script}`;
      const evaluatedScript = evalScript(scriptWithInjectedScope);
      setOutput(prev => [...prev, { text: evaluatedScript, type: 'output' }]);

      const scopeMutations = getScopeMutations(script);
      updateScope(scopeRef, scopeMutations);
    } catch (err) {
      const errorMessage = (err as Error).stack?.split('\n')[0] as string;
      console.error(err);
      setOutput(prev => [...prev, { text: errorMessage, type: 'error' }]);
    }
  };

  return { parseScript, output };
};
