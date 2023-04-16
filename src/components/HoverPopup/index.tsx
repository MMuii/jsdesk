import { AnimatePresence } from 'framer-motion';
import { PopupContainer } from './styled';

export enum HoverPopupPosition {
  left = 'left',
  center = 'center',
  right = 'right',
}

interface Props {
  show: boolean;
  children: React.ReactNode;
  position?: HoverPopupPosition;
}

const getAnimationProps = (position: HoverPopupPosition) => {
  const x = position === HoverPopupPosition.center ? '-50%' : 0;

  return {
    initial: { y: 4, x, opacity: 0 },
    animate: { y: 8, x, opacity: 1 },
    exit: { y: 4, x, opacity: 0 },
  };
};

export const HoverPopup = ({ show, children, position = HoverPopupPosition.center }: Props) => {
  return (
    <AnimatePresence>
      {show && (
        <PopupContainer
          {...getAnimationProps(position)}
          transition={{ duration: 0.1 }}
          $position={position}
        >
          {children}
        </PopupContainer>
      )}
    </AnimatePresence>
  );
};
