import {
  WindowContainer,
  WindowBarButtonContainer,
  WindowBarButton,
  WindowName,
  WindowBar,
} from 'components/Window/styled';
import { useDragControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

interface Props {
  children: React.ReactNode;
  dragContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  isFocused: boolean;
  onFocus: () => void;
  name: string;
  zIndex: number;
  onWindowClick?: (e?: any) => void;
}

interface FullScreenState {
  isFullScreen: boolean;
  beforeFullScreenPosition: {
    top: number;
    left: number;
  };
}

const variants = {
  fullScreen: {
    // position: 'fixed',
    x: 0,
    y: 0,
    height: '100vh',
    width: '100vw',
  },
  window: (variant: any) => {
    console.log('variant:', variant);
    return {
      x: variant.left,
      y: variant.top,
      height: '50rem',
      width: '70rem',
    };
  },
};

// TODO - move ShellProvider down into Terminal component
export const Window = ({
  dragContainerRef,
  onFocus,
  onWindowClick,
  isFocused,
  name,
  zIndex,
  children,
}: Props) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [fullScreenState, setFullScreenState] = useState<FullScreenState>(() => {
    const left = window.innerWidth / 2 - 700 / 2;
    const top = window.innerHeight / 2 - 500 / 2;

    return {
      isFullScreen: false,
      beforeFullScreenPosition: { top, left },
    };
  });
  const windowContainerRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();

  const setFullScreen = () => {
    const { top, left } = windowContainerRef.current!.getBoundingClientRect();
    flushSync(() => {
      setFullScreenState({ isFullScreen: true, beforeFullScreenPosition: { top, left } });
    });
  };

  const minimizeWindow = () => {
    setFullScreenState(prev => ({
      isFullScreen: false,
      beforeFullScreenPosition: { ...prev.beforeFullScreenPosition },
    }));
  };

  if (isClosed) return null;

  return (
    <WindowContainer
      onMouseDown={onFocus}
      onClick={onWindowClick}
      drag={!fullScreenState.isFullScreen}
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={dragContainerRef}
      dragElastic={0}
      dragMomentum={false}
      variants={variants}
      initial="window"
      animate={fullScreenState.isFullScreen ? 'fullScreen' : 'window'}
      custom={{
        top: fullScreenState.beforeFullScreenPosition.top,
        left: fullScreenState.beforeFullScreenPosition.left,
      }}
      transition={{
        type: 'tween',
        duration: 0.3,
      }}
      ref={windowContainerRef}
      $isFocused={isFocused}
      $zIndex={zIndex}
    >
      <WindowBar
        onPointerDown={e => dragControls.start(e, { snapToCursor: false })}
        onDoubleClick={fullScreenState.isFullScreen ? minimizeWindow : setFullScreen}
        isDraggable={!fullScreenState.isFullScreen}
      >
        <WindowBarButtonContainer>
          <WindowBarButton onClick={() => setIsClosed(true)} />
          <WindowBarButton onClick={minimizeWindow} />
          <WindowBarButton onClick={setFullScreen} />
        </WindowBarButtonContainer>
        <WindowName>{name}</WindowName>
      </WindowBar>
      {children}
    </WindowContainer>
  );
};
