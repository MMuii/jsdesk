import { FileExplorer } from 'components/apps/FileExplorer';
import { Painter } from 'components/apps/Painter';
import { TextEditor } from 'components/apps/TextEditor';
import { File } from 'utils/hooks/useFileSystem/File';
import { RenderableWindow } from 'utils/hooks/useWindowManager';

const defaultWindowProps = {
  height: 500,
  width: 700,
};

export const getDefaultWindowByFileType = (
  file: File,
  windowProps: any = defaultWindowProps,
  componentProps?: any,
): RenderableWindow => {
  switch (file.type) {
    case 'dir':
      return {
        id: window.crypto.randomUUID(),
        component: <FileExplorer />,
        name: 'File explorer',
        windowProps,
        componentProps: {
          initialPath: file.path,
          ...componentProps,
        },
      };
    case 'txt':
      return {
        id: window.crypto.randomUUID(),
        component: <TextEditor filePath={file.path} fileName={file.name} />,
        name: 'TextEdit',
        windowProps,
        componentProps: {
          ...componentProps,
        },
      };
    case 'jpg':
      return {
        id: window.crypto.randomUUID(),
        component: <Painter />,
        name: 'Painter',
        windowProps: {
          ...windowProps,
          width: 800,
        },
        componentProps: {
          initialFileRef: file,
          ...componentProps,
        },
      };
    default:
      throw new Error(`Could not open file: ${file.name} // TODO`); // TODO
  }
};
