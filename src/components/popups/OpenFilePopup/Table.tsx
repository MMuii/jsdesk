import { FilesTable, FilesTableProps, TableRowContextMenuOnClickArgs } from 'components/FilesTable';
import { Path } from 'interfaces/fs';
import { FileType } from 'utils/hooks/useFileSystem/File';
import { ContextMenuOption } from 'components/ContextMenu';

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

  const rowContextMenuOptions: ContextMenuOption<TableRowContextMenuOnClickArgs>[] = [
    {
      text: 'Open',
      onClick: (e, args) => handleFileDoubleClick(args!.file),
    },
  ];

  return (
    <FilesTable
      {...props}
      handleFileDoubleClick={handleFileDoubleClick}
      disableMakingFiles={true}
      tableRowContextMenuOptions={rowContextMenuOptions}
    />
  );
};
