import Editor from '@monaco-editor/react';
import { getFileTypeByName } from 'utils/fs/getFileTypeByName';
import { FileType } from 'utils/hooks/useFileSystem/File';

interface Props {
  selectedFile: FileType;
  isTerminalOpened: boolean;
  handleFileContentChange: (value?: string) => void;
}

export const FileEditor = ({ selectedFile, isTerminalOpened, handleFileContentChange }: Props) => {
  return (
    <Editor
      defaultLanguage="text"
      language={getFileTypeByName(selectedFile.type)}
      theme="vs-dark"
      height={`calc(100% - ${isTerminalOpened ? 30 : 0}rem - 3.7rem - 3rem)`}
      value={selectedFile.content}
      onChange={handleFileContentChange}
      path={selectedFile.path.join('')}
    />
  );
};
