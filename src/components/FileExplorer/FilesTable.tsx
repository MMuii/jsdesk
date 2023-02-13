import weakKey from 'weak-key';
import { Directory } from 'interfaces/fs';
import { getIconByFileType } from 'utils/fs/getIconByFileType';
import { FileTable, FileTableHeaderRow, FileTableRow } from './styled';

interface Props {
  directories: { [key: string]: Directory };
  changeDirectory: (pathString: string) => string | null;
}

export const FilesTable = ({ directories, changeDirectory }: Props) => {
  const renderCurrentLocationFiles = () => {
    return Object.entries(directories).map(([fileName, content]) => {
      return (
        <FileTableRow
          onDoubleClick={() => changeDirectory(fileName)}
          tabIndex={0}
          $type={content.type}
          key={weakKey(content)}
        >
          <td>
            {getIconByFileType(content.type)}
            <span>{fileName}</span>
          </td>
          <td>{new Date(content.updatedAt).toLocaleString()}</td>
          <td>120 kB</td>
          <td>{content.type}</td>
        </FileTableRow>
      );
    });
  };

  return (
    <div>
      <FileTable>
        <FileTableHeaderRow>
          <th>Name</th>
          <th>Date modified</th>
          <th>Size</th>
          <th>Type</th>
        </FileTableHeaderRow>
        {renderCurrentLocationFiles()}
      </FileTable>
    </div>
  );
};
