import React, { createContext, useContext, useRef } from 'react';
import { Terminal } from 'components/apps/Terminal';
import { Window } from 'components/Window';
import { DragContainer } from './styled';
import { RenderableWindow, useWindowManager } from 'utils/hooks/useWindowManager';
import { IconsContainer } from './IconsContainer';
import { AnimatePresence } from 'framer-motion';
import { useFileSystem } from 'utils/hooks/useFileSystem';
import { File } from 'utils/hooks/useFileSystem/File';

interface WindowManagerContextValue {
  openWindow: (window: RenderableWindow) => void;
  closeWindow: (id: string) => void;
}

const initialTerminal: RenderableWindow = {
  id: window.crypto.randomUUID(),
  component: <Terminal />,
  name: 'term',
  windowProps: {
    width: 700,
    height: 500,
  },
};

const WindowManagerContext = createContext({} as WindowManagerContextValue);
export const useWindowManagerContext = () =>
  useContext<WindowManagerContextValue>(WindowManagerContext);

export const Desktop = () => {
  const { windows, openWindow, focusWindow, closeWindow, zIndexList } = useWindowManager([
    initialTerminal,
  ]);
  const { listFiles } = useFileSystem();
  const dragContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <DragContainer ref={dragContainerRef}>
      <IconsContainer openWindow={openWindow} desktopFiles={listFiles(['/']) as File[]} />
      <WindowManagerContext.Provider value={{ openWindow, closeWindow }}>
        <AnimatePresence>
          {windows.map(({ id, component, name, windowProps, componentProps }) => {
            const componentWithCustomProps = React.cloneElement(component, {
              ...component.props,
              ...componentProps,
            });

            return (
              <Window
                dragContainerRef={dragContainerRef}
                key={id}
                isFocused={zIndexList[0] === id}
                onFocus={() => focusWindow(id)}
                onWindowClose={() => closeWindow(id)}
                name={name}
                zIndex={100 - zIndexList.indexOf(id)}
                {...windowProps}
              >
                {componentWithCustomProps}
              </Window>
            );
          })}
        </AnimatePresence>
      </WindowManagerContext.Provider>
    </DragContainer>
  );
};
