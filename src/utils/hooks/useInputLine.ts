import { Command } from 'utils/providers/ShellProvider';
import React, { useEffect, useMemo, useState } from 'react';
import levenshtein from 'js-levenshtein';
import { bins } from 'components/bin';

const programNames = Object.keys(bins);

export const useInputLine = (
  history: Command[],
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
): any => {
  const [inputValue, setInputValue] = useState<string>('');
  const [hint, setHint] = useState<string>('');

  const [historyPointer, setHistoryPointer] = useState<number>(0);
  const uniqueHistory = useMemo(() => [...new Set(history.map(entry => entry.cmd))], [history]);

  useEffect(() => {
    const handleArrowUp = (e: KeyboardEvent) => {
      if (
        e.key !== 'ArrowUp' ||
        inputRef.current !== document.activeElement ||
        uniqueHistory.length === 0
        // inputRef.current?.value.length
      ) {
        return;
      }

      const lastCommand = uniqueHistory[historyPointer];
      setInputValue(lastCommand);
      console.log('historyPointer:', historyPointer);
      console.log('lastCommand:', lastCommand);

      const nextPointer = historyPointer >= uniqueHistory.length - 1 ? 0 : historyPointer + 1;
      setHistoryPointer(nextPointer);
    };

    document.addEventListener('keydown', handleArrowUp);

    return () => document.removeEventListener('keydown', handleArrowUp);
  }, [uniqueHistory, history.length, historyPointer]);

  useEffect(() => {
    setTimeout(() => {
      const end = inputRef.current!.value.length;
      inputRef.current?.setSelectionRange(end, end);
    }, 0);
  }, [historyPointer, inputRef]);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value.length === 0) {
      setHint('');
      return;
    }

    const programNameInput = value.trim().split(' ')[0];

    const closestName = programNames.reduce(
      (lastClosest, currentName) => {
        const distance = levenshtein(lastClosest.name, currentName);
        if (distance <= lastClosest.distance && currentName.startsWith(programNameInput)) {
          return {
            name: currentName,
            distance,
          };
        }

        return lastClosest;
      },
      { name: '', distance: Infinity },
    );

    setHint(closestName.name);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setInputValue('');
    setHint('');
    setHistoryPointer(0);
  };

  const isInputValid = programNames.includes(inputValue.trim().split(' ')[0]);

  return { inputValue, setInputValue, handleInputChange, handleInputSubmit, isInputValid, hint };
};
