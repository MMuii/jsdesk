import { IconContainer } from './styled';

interface Props {
  onDoubleClick: () => void;
  tabIndex: number;
  name: string;
  icon: React.ReactElement;
}

export const DesktopIcon = ({ onDoubleClick, tabIndex, icon, name }: Props) => {
  return (
    <IconContainer onDoubleClick={onDoubleClick} tabIndex={tabIndex}>
      {icon}
      <div>{name}</div>
    </IconContainer>
  );
};
