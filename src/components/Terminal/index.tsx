import React, { useRef, useEffect, useMemo, useState } from 'react';
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
  DragContainer,
} from './styled';
import { useDragControls } from 'framer-motion';

const fullScreenAnimate = {
  position: 'fixed',
  x: 0,
  y: 0,
  height: '100vh',
  width: '100vw',
};

const windowAnimate = {
  height: '50rem',
  width: '70rem',
};

export const Terminal = () => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dragContainerRef = useRef<HTMLDivElement | null>(null);
  const { renderHistory, processCommand, callStack, history } = useShell();
  const { inputValue, handleInputChange, handleInputSubmit, isInputValid, hint } = useInputLine(
    history,
    inputRef,
  );
  const dragControls = useDragControls();

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
            <HistoryEntry>
              <Ps1 />
              <span>{h.cmd}</span>
            </HistoryEntry>
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
    <DragContainer ref={dragContainerRef}>
      {!isClosed && (
        <TerminalContainer
          onClick={handleTerminalClick}
          drag={!isFullScreen}
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={dragContainerRef}
          dragElastic={0}
          dragMomentum={false}
          initial={windowAnimate}
          animate={isFullScreen ? fullScreenAnimate : windowAnimate}
          transition={{
            type: 'tween',
            duration: 0.3,
          }}
        >
          <WindowBar
            onPointerDown={e => dragControls.start(e, { snapToCursor: false })}
            isDraggable={!isFullScreen}
          >
            <WindowBarButtonContainer>
              <WindowBarButton onClick={() => setIsClosed(true)} />
              <WindowBarButton onClick={() => setIsFullScreen(false)} />
              <WindowBarButton onClick={() => setIsFullScreen(true)} />
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
      )}
    </DragContainer>
  );
};
