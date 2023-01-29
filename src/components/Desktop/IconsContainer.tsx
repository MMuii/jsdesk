import { DesktopIcon } from 'components/DesktopIcon';
import { Terminal } from 'components/Terminal';
import { RenderableWindow } from 'utils/hooks/useWindowManager';
import { IoTerminal } from 'react-icons/io5';
import { DesktopIconsContainer } from './styled';

interface Props {
  openWindow: (window: RenderableWindow) => void;
}

interface DesktopIcon {
  openingWindow: RenderableWindow;
  name: string;
  icon: React.ReactElement;
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

const initialDesktopIcons: DesktopIcon[] = [
  { openingWindow: initialTerminal, name: 'term', icon: <IoTerminal /> },
];

export const IconsContainer = ({ openWindow }: Props) => {
  const renderIcons = () => {
    return initialDesktopIcons.map(({ openingWindow, name, icon }, idx) => (
      <DesktopIcon
        onDoubleClick={() => openWindow(openingWindow)}
        tabIndex={0}
        name={name}
        icon={icon}
        key={idx} // TODO - replace this after implementing icons reorder
      />
    ));
  };

  return <DesktopIconsContainer>{renderIcons()}</DesktopIconsContainer>;
};
