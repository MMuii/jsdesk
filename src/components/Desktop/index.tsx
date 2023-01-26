import { useRef } from 'react';
import { Terminal } from 'components/Terminal';
import { Window } from 'components/Window';
import { DragContainer } from './styled';
import { RenderableWindow, useWindowManager } from 'utils/hooks/useWindowManager';

const initialTerminalId = window.crypto.randomUUID();
const initialTerminalId2 = window.crypto.randomUUID();

const initialTerminal: RenderableWindow = {
  id: initialTerminalId,
  component: <Terminal />,
  name: initialTerminalId,
};

export const Desktop = () => {
  const { windows, focusWindow, zIndexList } = useWindowManager([
    initialTerminal,
    { id: initialTerminalId2, component: <Terminal />, name: initialTerminalId2 },
  ]);
  const dragContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <DragContainer ref={dragContainerRef}>
      {windows.map(({ id, component, name }) => {
        return (
          <Window
            dragContainerRef={dragContainerRef}
            key={id}
            isFocused={zIndexList[0] === id}
            onFocus={() => focusWindow(id)}
            name={name}
            zIndex={100 - zIndexList.indexOf(id)}
          >
            {component}
          </Window>
        );
      })}
    </DragContainer>
  );
};
