import { ContextMenuContainer, ContextMenuOption as ContextMenuOptionEl } from './styled';

interface Props {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  options: ContextMenuOption[];
}

export interface ContextMenuOption {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  icon?: React.ReactNode;
}

export const ContextMenu = ({ x, y, isOpen, options, onClose }: Props) => {
  const renderOptions = () => {
    const handleClick = (
      e: React.MouseEvent<HTMLDivElement>,
      onClickHandler: React.MouseEventHandler<HTMLDivElement>,
    ) => {
      onClickHandler(e);
      onClose();
    };

    return options.map((option, idx) => (
      <ContextMenuOptionEl key={idx} onClick={e => handleClick(e, option.onClick)}>
        {option.text}
      </ContextMenuOptionEl>
    ));
  };

  return (
    <ContextMenuContainer $x={x} $y={y} $isOpen={isOpen}>
      {renderOptions()}
    </ContextMenuContainer>
  );
};
