import React, { useRef } from 'react';
import { Terminal } from 'components/Terminal';
import { Window } from 'components/Window';
import { DragContainer } from './styled';
import { RenderableWindow, useWindowManager } from 'utils/hooks/useWindowManager';
import { PicturePreview } from 'components/PicturePreview';
import { IconsContainer } from './IconsContainer';
import { AnimatePresence } from 'framer-motion';
import { DocPreview } from 'components/DocPreview';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { useFileSystem } from 'utils/hooks/useFileSystem';

const initialTerminal: RenderableWindow = {
  id: window.crypto.randomUUID(),
  component: <Terminal />,
  name: 'term',
  windowProps: {
    width: 700,
    height: 500,
  },
};

// const initialWindow: RenderableWindow = {
//   id: window.crypto.randomUUID(),
//   component: <PicturePreview imgName="floppa.jpeg" />,
//   name: 'ImgViewer',
// };

const initialDocPreview: RenderableWindow = {
  id: window.crypto.randomUUID(),
  component: <DocPreview docName="resume.pdf" />,
  name: 'DocPreview - resume.pdf',
  windowProps: {
    height: 842,
    width: 597,
  },
};

export const Desktop = () => {
  const { windows, openWindow, focusWindow, closeWindow, zIndexList } = useWindowManager([
    initialTerminal,
    // initialWindow,
  ]);
  const { listFiles } = useFileSystem();
  const dragContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <DragContainer ref={dragContainerRef}>
      <IconsContainer openWindow={openWindow} desktopFiles={listFiles('/')} />
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
    </DragContainer>
  );
};
