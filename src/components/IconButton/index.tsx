import { useCallback, useState } from 'react';
import { IconContainer } from './styled';
import { BsFillCheckCircleFill } from 'react-icons/bs';

interface Props {
  icon: JSX.Element;
  onClick: () => void;
  showChevronOnclickCallback?: boolean;
  disabled?: boolean;
}

export const IconButton = ({
  icon,
  onClick,
  showChevronOnclickCallback = false,
  disabled = false,
}: Props) => {
  const [showChevronCallback, setShowChevronCallback] = useState(false);

  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();

    if (showChevronOnclickCallback) {
      setShowChevronCallback(true);
      setTimeout(() => {
        setShowChevronCallback(false);
      }, 1500);
    }
  }, [onClick, disabled]);

  return (
    <IconContainer $disabled={disabled} onClick={handleClick}>
      {icon}
      {showChevronCallback && <BsFillCheckCircleFill />}
    </IconContainer>
  );
};
