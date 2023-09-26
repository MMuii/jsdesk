import { IoTerminal } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { HiCodeBracketSquare, HiPaintBrush } from 'react-icons/hi2';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { RenderableWindow } from 'utils/hooks/useWindowManager';
import { getDefaultWindowByFileType } from 'utils/fs/getDefaultWindowByFileType';
import { File } from 'utils/hooks/useFileSystem/File';
import { getIconByFileType } from 'utils/fs/getIconByFileType';
import { DesktopIcon } from 'components/DesktopIcon';
import { Terminal } from 'components/apps/Terminal';
import { Painter } from 'components/apps/Painter';
import { Settings } from 'components/apps/Settings';
import { DesktopIconsContainer } from './styled';
import { CodeEditor } from 'components/apps/CodeEditor';

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
    height: 600,
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
    height: 807,
    width: 808,
    minHeight: 300,
    minWidth: 500,
  },
};

const codeEditorWindow: RenderableWindow = {
  id: window.crypto.randomUUID(),
  component: <CodeEditor />,
  name: 'Code editor',
  windowProps: {
    height: 600,
    width: 800,
    minHeight: 300,
    minWidth: 500,
  },
};

const initialDesktopIcons: DesktopIcon[] = [
  { openingWindow: terminalWindow, name: 'term', icon: <IoTerminal /> },
  { openingWindow: painterWindow, name: 'Painter', icon: <HiPaintBrush /> },
  { openingWindow: settingsWindow, name: 'Settings', icon: <IoMdSettings /> },
  { openingWindow: codeEditorWindow, name: 'Code editor', icon: <HiCodeBracketSquare /> },
];

const links = [
  { icon: <AiFillGithub />, url: 'https://github.com/mmuii', name: 'GitHub' },
  {
    icon: <AiFillLinkedin />,
    url: 'https://www.linkedin.com/in/marcin-swiderek2/',
    name: 'LinkedIn',
  },
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
          key={idx}
        />
      ),
    );
  };

  const renderLinks = () => {
    return links.map(({ icon, url, name }, idx) => (
      <DesktopIcon
        onDoubleClick={() => window.open(url, '_blank')}
        tabIndex={0}
        name={name}
        icon={icon}
        key={idx}
      />
    ));
  };

  return (
    <DesktopIconsContainer id="desktop-icons-container">
      {renderIcons()}
      {renderLinks()}
    </DesktopIconsContainer>
  );
};
