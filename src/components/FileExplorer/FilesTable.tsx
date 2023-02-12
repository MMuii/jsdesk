import weakKey from 'weak-key';
import { Directory } from 'interfaces/fs';
import { getIconByFileType } from 'utils/fs/getIconByFileType';
import { FileEntry } from './styled';

interface Props {
  directories: { [key: string]: Directory };
  changeDirectory: (pathString: string) => string | null;
}

export const FilesTable = ({ directories, changeDirectory }: Props) => {
  const renderCurrentLocationFiles = () => {
    return Object.entries(directories).map(([fileName, content]) => {
      return (
        <FileEntry
          onDoubleClick={() => changeDirectory(fileName)}
          tabIndex={0}
          $type={content.type}
          key={weakKey(content)}
        >
          {getIconByFileType(content.type)}
          {fileName}
        </FileEntry>
      );
    });
  };

  return <div style={{ padding: '1rem' }}>{renderCurrentLocationFiles()}</div>;
};
