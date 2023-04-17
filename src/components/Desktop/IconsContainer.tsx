import { IoTerminal } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { HiDocument } from 'react-icons/hi';
import { HiPaintBrush } from 'react-icons/hi2';
import { RenderableWindow } from 'utils/hooks/useWindowManager';
import { getDefaultWindowByFileType } from 'utils/fs/getDefaultWindowByFileType';
import { File } from 'utils/hooks/useFileSystem/File';
import { getIconByFileType } from 'utils/fs/getIconByFileType';
import { DesktopIcon } from 'components/DesktopIcon';
import { Terminal } from 'components/apps/Terminal';
import { Painter } from 'components/apps/Painter';
import { DocPreview } from 'components/apps/DocPreview';
import { Settings } from 'components/apps/Settings';
import { DesktopIconsContainer } from './styled';

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
    minHeight: 400,
    minWidth: 500,
  },
};

const settingsWindow: RenderableWindow = {
  id: window.crypto.randomUUID(),
  component: <Settings />,
  name: 'Settings',
  windowProps: {
    height: 400,
    width: 600,
    minHeight: 300,
    minWidth: 500,
  },
};

const initialDesktopIcons: DesktopIcon[] = [
  { openingWindow: terminalWindow, name: 'term', icon: <IoTerminal /> },
  { openingWindow: docPreviewWindow, name: 'resume.pdf', icon: <HiDocument /> },
  { openingWindow: painterWindow, name: 'Painter', icon: <HiPaintBrush /> },
  { openingWindow: settingsWindow, name: 'Settings', icon: <IoMdSettings /> },
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
