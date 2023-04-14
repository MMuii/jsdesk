import { useWindowManagerContext } from 'components/Desktop';
import { FilesTable, FilesTableProps, TableRowContextMenuOnClickArgs } from 'components/FilesTable';
import { FileType } from 'utils/hooks/useFileSystem/File';
import { TextEditor } from '../TextEditor';
import { ContextMenuOption } from 'components/ContextMenu';

export const Table = (props: Omit<FilesTableProps, 'handleFileDoubleClick'>) => {
  const { openWindow } = useWindowManagerContext();
  const { changeDirectory, location } = props.fsSession;

  const handleFileDoubleClick = (file: FileType) => {
    switch (file.type) {
      case 'dir': {
        console.log('changing directory to:', file);
        changeDirectory(file.name);
        return;
      }
      case 'txt': {
        openWindow({
          id: window.crypto.randomUUID(),
          component: <TextEditor filePath={[...location, file.name]} fileName={file.name} />,
          name: 'TextEdit',
          windowProps: {
            width: 700,
            height: 700,
          },
        });
      }
    }
  };

  const rowContextMenuOptions: ContextMenuOption<TableRowContextMenuOnClickArgs>[] = [
    {
      text: 'Open',
      onClick: (e, args) => handleFileDoubleClick(args!.file),
    },
    {
      text: 'Rename',
      onClick: (e, args) => args!.rename(),
    },
    {
      text: 'Delete',
      onClick: (e, args) => args!.remove(),
    },
  ];

  return (
    <FilesTable
      {...props}
      handleFileDoubleClick={handleFileDoubleClick}
      tableRowContextMenuOptions={rowContextMenuOptions}
    />
  );
};
