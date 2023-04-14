import { FilesTable, FilesTableProps } from 'components/FilesTable';
import { Path } from 'interfaces/fs';
import { FileType } from 'utils/hooks/useFileSystem/File';

interface Props extends Omit<FilesTableProps, 'handleFileDoubleClick'> {
  onDirectorySelect: (dir: Path) => void;
}

export const Table = (props: Props) => {
  const { changeDirectory } = props.fsSession;

  const handleFileDoubleClick = (file: FileType) => {
    switch (file.type) {
      case 'dir': {
        changeDirectory(file.name);
        return;
      }
      default: {
        props.onDirectorySelect(file.path);
        return;
      }
    }
  };

  return <FilesTable {...props} handleFileDoubleClick={handleFileDoubleClick} />;
};
