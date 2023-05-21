import Editor from '@monaco-editor/react';
import { FileType } from 'utils/hooks/useFileSystem/File';

interface Props {
  selectedFile: FileType;
  isTerminalOpened: boolean;
  handleFileContentChange: (value?: string) => void;
}

const getFileLanguage = (fileType: string): string => {
  switch (fileType) {
    case 'js':
      return 'javascript';
    default:
      return fileType;
  }
};

export const FileEditor = ({ selectedFile, isTerminalOpened, handleFileContentChange }: Props) => {
  return (
    <Editor
      language={getFileLanguage(selectedFile.type)}
      theme="vs-dark"
      height={`calc(100% - ${isTerminalOpened ? 30 : 0}rem - 3.7rem - 3rem)`}
      value={selectedFile.content}
      onChange={handleFileContentChange}
      path={selectedFile.path.join('')}
    />
  );
};
