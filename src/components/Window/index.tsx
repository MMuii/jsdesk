import { useRef, useState } from 'react';
import {
  WindowContainer,
  WindowBarButtonContainer,
  WindowBarButton,
  WindowName,
  WindowBar,
} from 'components/Window/styled';
import { useDragControls, Variants } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  dragContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  isFocused: boolean;
  onFocus: () => void;
  onWindowClose: () => void;
  name: string;
  zIndex: number;
  width?: number;
  height?: number;
  onWindowClick?: (e?: any) => void;
}

interface FullScreenState {
  isFullScreen: boolean;
  beforeFullScreenPosition: {
    top: number;
    left: number;
  };
}

interface WindowVariantArgs {
  left: number;
  top: number;
  width?: number;
  height?: number;
}

const variants: Variants = {
  fullScreen: {
    x: 0,
    y: 0,
    height: '100vh',
    width: '100vw',
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  window: ({ left, top, height, width }: WindowVariantArgs) => ({
    x: left,
    y: top,
    height: height === undefined ? 'min-content' : height,
    width: width === undefined ? 'min-content' : width,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  }),
  initial: ({ left, top }: WindowVariantArgs) => ({
    x: left - 70,
    y: top - 70,
    width: 200,
    height: 200,
    opacity: 0,
  }),
};

export const Window = ({
  dragContainerRef,
  onFocus,
  onWindowClose,
  onWindowClick,
  isFocused,
  name,
  zIndex,
  children,
  width,
  height,
}: Props) => {
  const [fullScreenState, setFullScreenState] = useState<FullScreenState>(() => {
    const left = window.innerWidth / 2 - (width ?? 300) / 2;
    const top = window.innerHeight / 2 - (height ?? 300) / 2;

    return {
      isFullScreen: false,
      beforeFullScreenPosition: { top, left },
    };
  });
  const windowContainerRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();

  const setFullScreen = () => {
    const { top, left } = windowContainerRef.current!.getBoundingClientRect();
    setFullScreenState({ isFullScreen: true, beforeFullScreenPosition: { top, left } });
  };

  const minimizeWindow = () => {
    setFullScreenState(prev => ({
      isFullScreen: false,
      beforeFullScreenPosition: { ...prev.beforeFullScreenPosition },
    }));
  };

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
      initial="initial"
      animate={fullScreenState.isFullScreen ? 'fullScreen' : 'window'}
      custom={{
        top: fullScreenState.beforeFullScreenPosition.top,
        left: fullScreenState.beforeFullScreenPosition.left,
        width,
        height,
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
        <WindowBarButtonContainer $isFocused={isFocused}>
          <WindowBarButton onClick={onWindowClose} />
          <WindowBarButton onClick={minimizeWindow} />
          <WindowBarButton onClick={setFullScreen} />
        </WindowBarButtonContainer>
        <WindowName>{name}</WindowName>
      </WindowBar>
      {children}
    </WindowContainer>
  );
};
