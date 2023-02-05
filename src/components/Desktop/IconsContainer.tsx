import { DesktopIcon } from 'components/DesktopIcon';
import { Terminal } from 'components/Terminal';
import { RenderableWindow } from 'utils/hooks/useWindowManager';
import { IoTerminal, IoFolder } from 'react-icons/io5';
import { HiDocument } from 'react-icons/hi';
import { DesktopIconsContainer } from './styled';
import { DocPreview } from 'components/DocPreview';

interface Props {
  openWindow: (window: RenderableWindow) => void;
  desktopFiles: Array<[string, string]>;
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

const initialDocPreview: RenderableWindow = {
  id: window.crypto.randomUUID(),
  component: <DocPreview docName="resume.pdf" />,
  name: 'DocPreview - resume.pdf',
  windowProps: {
    height: 842,
    width: 597,
  },
};

const initialDesktopIcons: DesktopIcon[] = [
  { openingWindow: initialTerminal, name: 'term', icon: <IoTerminal /> },
  { openingWindow: initialDocPreview, name: 'resume.pdf', icon: <HiDocument /> },
];

const getFileIcon = (fileType: string): React.ReactElement => {
  switch (fileType) {
    case 'dir':
      return <IoFolder />;
    default:
      return <IoFolder />;
  }
};

export const IconsContainer = ({ openWindow, desktopFiles }: Props) => {
  const renderIcons = () => {
    const desktopFilesIcons: DesktopIcon[] = desktopFiles.map(([fileName, fileType]) => ({
      openingWindow: initialTerminal,
      name: fileName,
      icon: getFileIcon(fileType),
    }));

    return [...initialDesktopIcons, ...desktopFilesIcons].map(
      ({ openingWindow, name, icon }, idx) => (
        <DesktopIcon
          onDoubleClick={() => openWindow(openingWindow)}
          tabIndex={0}
          name={name}
          icon={icon}
          key={idx} // TODO - replace this after implementing icons reorder
        />
      ),
    );
  };

  return <DesktopIconsContainer>{renderIcons()}</DesktopIconsContainer>;
};
