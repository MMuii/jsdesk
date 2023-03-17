import { DesktopIcon } from 'components/DesktopIcon';
import { Terminal } from 'components/Terminal';
import { Painter } from 'components/Painter';
import { RenderableWindow } from 'utils/hooks/useWindowManager';
import { IoTerminal } from 'react-icons/io5';
import { HiDocument } from 'react-icons/hi';
import { HiPaintBrush } from 'react-icons/hi2';
import { DesktopIconsContainer } from './styled';
import { DocPreview } from 'components/DocPreview';
import { getIconByFileType } from 'utils/fs/getIconByFileType';
import { File } from 'utils/hooks/useFileSystem/File';
import { getDefaultWindowByFileType } from 'utils/fs/getDefaultWindowByFileType';

interface Props {
  openWindow: (window: RenderableWindow) => void;
  desktopFiles: File[];
}

interface DesktopIcon {
  // TODO - rename to avoid naming conflict with DesktopIcon component
  openingWindow: RenderableWindow;
  name: string;
  icon: React.ReactElement;
}

const terminalWindow: RenderableWindow = {
  id: window.crypto.randomUUID(),
  component: <Terminal />,
  name: 'term',
  windowProps: {
    width: 700,
    height: 500,
  },
};

const docPreviewWindow: RenderableWindow = {
  id: window.crypto.randomUUID(),
  component: <DocPreview docName="resume.pdf" />,
  name: 'DocPreview',
  windowProps: {
    height: 842,
    width: 597,
  },
};

const painterWindow: RenderableWindow = {
  id: window.crypto.randomUUID(),
  component: <Painter />,
  name: 'Painter',
  windowProps: {
    height: 500,
    width: 800,
  },
};

const initialDesktopIcons: DesktopIcon[] = [
  { openingWindow: terminalWindow, name: 'term', icon: <IoTerminal /> },
  { openingWindow: docPreviewWindow, name: 'resume.pdf', icon: <HiDocument /> },
  { openingWindow: painterWindow, name: 'Painter', icon: <HiPaintBrush /> },
];

export const IconsContainer = ({ openWindow, desktopFiles }: Props) => {
  const renderIcons = () => {
    const desktopFilesIcons: DesktopIcon[] = desktopFiles.map(file => ({
      openingWindow: getDefaultWindowByFileType(file),
      name: file.name,
      icon: getIconByFileType(file.type),
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
