import React, { useState } from 'react';
import { useShell } from 'utils/ShellProvider';
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
  const { history, renderHistory, processCommand, callStack, theme } = useShell();
  const [inputValue, setInputValue] = useState<string>('');

  const renderRenderableHistory = () =>
    renderHistory.map(h => {
      const isFocused = callStack.at(-1) === h.pid;

      return (
        <div key={h.pid}>
          <HistoryEntry>
            <Ps1 />
            <span>{h.cmd}</span>
          </HistoryEntry>
          <h.component {...h.args} isFocused={isFocused} />

          {/*<h.output*/}
          {/*  args={h.args}*/}
          {/*  isFocused={isFocused}*/}
          {/*  key={h.pid}*/}
          {/*  terminate={h.terminate}*/}
          {/*  clearHistory={h.clearHistory}*/}
          {/*/>*/}
        </div>
      );
    });

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.code === '13') {
      e.preventDefault();
      console.log('running command:', inputValue);
      processCommand(inputValue);
      setInputValue('');
    }
  };

  return (
    <TerminalContainer>
      <WindowBar>
        <WindowBarButtonContainer>
          <WindowBarButton />
          <WindowBarButton />
          <WindowBarButton />
        </WindowBarButtonContainer>
        <WindowName>xdterm</WindowName>
      </WindowBar>
      <HistoryContainer>
        {renderRenderableHistory()}
        {callStack.length <= 1 && (
          <InputLine
            handleSubmit={handleSubmit}
            handleChange={value => setInputValue(value)}
            value={inputValue}
          />
        )}
      </HistoryContainer>
    </TerminalContainer>
  );
};
