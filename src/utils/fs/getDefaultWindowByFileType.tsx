import { FileExplorer } from 'components/FileExplorer';
import { TextEditor } from 'components/TextEditor';
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
    default:
      throw new Error(`Could not open file: ${file.name}`); // TODO
  }
};
