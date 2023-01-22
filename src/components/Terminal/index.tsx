import React, { useRef, useEffect, useMemo } from 'react';
import { useShell } from 'utils/providers/ShellProvider';
import { useInputLine } from 'utils/hooks/useInputLine';
import { InputLine } from 'components/InputLine';
import { Ps1 } from 'components/Ps1';
import {
  TerminalContainer,
  WindowBar,
  WindowBarButtonContainer,
  WindowBarButton,
  WindowName,
  HistoryContainer,
  HistoryEntry,
} from './styled';

export const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { renderHistory, processCommand, callStack, history } = useShell();
  const { inputValue, handleInputChange, handleInputSubmit, isInputValid, hint } = useInputLine(
    history,
    inputRef,
  );

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [renderHistory]);

  const renderableHistory = useMemo(() => {
    return renderHistory.map(h => {
      const isFocused = callStack.at(-1) === h.pid;

      return (
        <div key={h.pid}>
          <HistoryEntry>
            <Ps1 />
            <span>{h.cmd}</span>
          </HistoryEntry>
          <h.component {...h.args} isFocused={isFocused} />
        </div>
      );
    });
  }, [callStack, renderHistory]);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    <TerminalContainer onClick={handleTerminalClick}>
      <WindowBar>
        <WindowBarButtonContainer>
          <WindowBarButton />
          <WindowBarButton />
          <WindowBarButton />
        </WindowBarButtonContainer>
        <WindowName>xdterm</WindowName>
      </WindowBar>
      <HistoryContainer ref={terminalRef}>
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
    </TerminalContainer>
  );
};
