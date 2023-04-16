import { useCallback, useRef, useState } from 'react';
import { IconContainer } from './styled';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { HoverPopup, HoverPopupPosition } from 'components/HoverPopup';

interface Props {
  icon: JSX.Element;
  onClick: () => void;
  hoverPopupContent?: React.ReactNode;
  hoverPopupPosition?: HoverPopupPosition;
  showChevronOnclickCallback?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const IconButton = ({
  icon,
  onClick,
  hoverPopupContent,
  hoverPopupPosition,
  showChevronOnclickCallback = false,
  disabled = false,
  style,
}: Props) => {
  const [showChevronCallback, setShowChevronCallback] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();

    if (showChevronOnclickCallback) {
      setShowChevronCallback(true);
      setTimeout(() => {
        setShowChevronCallback(false);
      }, 750);
    }
  }, [onClick, disabled]);

  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setShowPopup(true);
    }, 750);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setShowPopup(false);
  }, []);

  return (
    <IconContainer
      layout
      $disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {icon}
      {showChevronCallback && <BsFillCheckCircleFill />}
      {hoverPopupContent && (
        <HoverPopup show={showPopup} position={hoverPopupPosition}>
          {hoverPopupContent}
        </HoverPopup>
      )}
    </IconContainer>
  );
};
