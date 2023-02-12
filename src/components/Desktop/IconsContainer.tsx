import { DesktopIcon } from 'components/DesktopIcon';
import { Terminal } from 'components/Terminal';
import { RenderableWindow } from 'utils/hooks/useWindowManager';
import { IoTerminal, IoFolder } from 'react-icons/io5';
import { HiDocument } from 'react-icons/hi';
import { DesktopIconsContainer } from './styled';
import { DocPreview } from 'components/DocPreview';
import { FileExplorer } from 'components/FileExplorer';
import { getIconByFileType } from 'utils/fs/getIconByFileType';
import { Directory } from 'interfaces/fs';

interface Props {
  openWindow: (window: RenderableWindow) => void;
  desktopFiles: Array<[string, Directory]>;
}

interface DesktopIcon {
  // TODO - rename to avoid naming conflict with DesktopIcon component
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

const getOpeningWindow = (fileName: string, fileType: string): RenderableWindow => {
  switch (fileType) {
    case 'dir':
      return {
        id: window.crypto.randomUUID(),
        component: <FileExplorer />,
        name: 'File explorer',
        windowProps: {
          height: 500,
          width: 700,
        },
        componentProps: {
          initialPath: ['/', fileName],
        },
      };
    default:
      return initialTerminal; // TODO
  }
};

export const IconsContainer = ({ openWindow, desktopFiles }: Props) => {
  const renderIcons = () => {
    const desktopFilesIcons: DesktopIcon[] = desktopFiles.map(([fileName, content]) => ({
      openingWindow: getOpeningWindow(fileName, content.type),
      name: fileName,
      icon: getIconByFileType(content.type),
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
