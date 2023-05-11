import React, { useRef, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useInputLine } from 'utils/hooks/useInputLine';
import { InputLine } from 'components/InputLine';
import { NoRerenderedPs1 } from 'components/Ps1';
import { HistoryContainer } from 'components/apps/Terminal/styled';
import { useShell } from 'utils/hooks/useShell';

export interface TerminalRef {
  run: (
    command: string,
    renderedCommandName?: string | undefined,
    renderOnlyComponent?: boolean,
  ) => void;
}

export const Terminal = forwardRef<TerminalRef, {}>((_, ref) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { renderHistory, processCommand, callStack, history } = useShell();
  const { inputValue, handleInputChange, handleInputSubmit, isInputValid, hint } = useInputLine(
    history,
    inputRef,
  );

  useImperativeHandle(ref, () => ({
    run(command: string, renderedCommandName?: string) {
      processCommand(command, renderedCommandName);
    },
  }));

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [renderHistory]);

  const renderableHistory = useMemo(() => {
    return renderHistory.map(h => {
      const isFocused = callStack.at(-1) === h.pid;

      return (
        <div key={h.time.getTime()}>
          {h.cmd && (
            <div>
              <NoRerenderedPs1 />
              <span>{h.cmd}</span>
            </div>
          )}
          <h.component {...h.args} isFocused={isFocused} />
        </div>
      );
    });
  }, [callStack, renderHistory]);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.length === 0) {
      return;
    }

    if (e.key === 'Enter' || e.code === '13') {
      e.preventDefault();
      processCommand(inputValue);
      handleInputSubmit();
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  };

  return (
    <HistoryContainer ref={terminalRef} onClick={handleTerminalClick}>
      {renderableHistory}
      {callStack.length <= 1 && (
        <InputLine
          handleSubmit={handleSubmit}
          handleChange={value => handleInputChange(value)}
          value={inputValue}
          hint={hint}
          isValid={isInputValid}
          inputRef={inputRef}
        />
      )}
    </HistoryContainer>
  );
});
