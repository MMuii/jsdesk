import { useState, useRef } from 'react';
import weakKey from 'weak-key';
import { Path } from 'interfaces/fs';
import { useWindowManagerContext } from 'components/Desktop';
import { TextEditor } from 'components/apps/TextEditor';
import { useContextMenu } from 'utils/providers/ContextMenuProvider';
import { ContextMenuOption } from 'components/ContextMenu';
import { File, FileType } from 'utils/hooks/useFileSystem/File';
import { FileTableRow, EmptyFileTableRow } from 'components/apps/FileExplorer/FileTableRow';
import { ResizableTable, TableWrapper } from 'components/apps/FileExplorer/styled';
import { HeaderNavigation } from 'components/apps/FileExplorer/HeaderNavigation';
import { FileWithSize, useFilesTable } from 'utils/hooks/useFilesTable';
import { TableHeaders } from './TableHeaders';

interface Props {
  location: Path;
  currentDirRef: File;
  changeDirectory: (pathString: string | Path) => string | void;
  moveFile: (path: string | Path, newPath: string | Path) => string | void;
  removeFile: (path: string | Path) => string | void;
  makeFile: (path: string | Path, type: string, addEvenIfExists?: boolean) => string | void;
}

export const FilesTable = ({
  currentDirRef,
  changeDirectory,
  location,
  moveFile,
  removeFile,
  makeFile,
}: Props) => {
  const { dirs, sort, setSort, getSortFn } = useFilesTable(currentDirRef);
  const [renamingTableRowIndex, setRenamingTableRowIndex] = useState<number | null>(null);
  const tableElement = useRef<HTMLTableElement | null>(null);
  const tableRowElements = useRef<Array<HTMLTableRowElement | null>>([]);
  const tableWrapperElement = useRef<HTMLDivElement | null>(null);
  const { openWindow } = useWindowManagerContext();
  const { openContextMenu } = useContextMenu();

  const handleFileDoubleClick = (file: FileType) => {
    switch (file.type) {
      case 'dir': {
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

  const renderCurrentLocationFiles = () => {
    if (dirs.length === 0) {
      return <EmptyFileTableRow />;
    }

    return dirs.map((file, idx) => {
      const rowContextMenuOptions: ContextMenuOption[] = [
        { text: 'Open', onClick: () => handleFileDoubleClick(file) },
        {
          text: 'Rename',
          onClick: () => setRenamingTableRowIndex(idx),
        },
        {
          text: 'Delete',
          onClick: () => removeFile(file.path),
        },
      ];

      return (
        <FileTableRow
          onDoubleClick={() => handleFileDoubleClick(file)}
          file={file}
          key={weakKey(file)}
          onContextMenuCapture={e =>
            openContextMenu(e, [tableRowElements.current[idx] as Element], rowContextMenuOptions)
          }
          ref={el => (tableRowElements.current[idx] = el)}
          isRenaming={renamingTableRowIndex === idx}
          onRename={newName => {
            setRenamingTableRowIndex(null);
            moveFile(file.path, [...file.path.slice(0, -1), newName]);
          }}
          onRenameCancel={() => setRenamingTableRowIndex(null)}
        />
      );
    });
  };

  const createNewFileAndFocusTableRow = (name: string, type: string) => {
    makeFile([name], type, true);
    const doesFileExist = currentDirRef.files.some(file => file.name === name);
    const newSampleFile: FileWithSize = {
      files: [],
      type,
      updatedAt: new Date().toISOString(),
      name: doesFileExist
        ? `${name} (${currentDirRef.getCopyNumberForNewAlreadyExistingChildFile(name)})`
        : name,
      size: type === 'dir' ? null : 0,
      isDirectory: type === 'dir',
      content: [],
      path: [],
    };
    const sortFn = getSortFn(sort.col, sort.order);
    const newFileIndex = [...dirs, newSampleFile]
      .sort(sortFn)
      .findIndex(file => file.name === newSampleFile.name);
    setRenamingTableRowIndex(newFileIndex);
  };

  const tableContextMenuOptions: ContextMenuOption[] = [
    { text: 'New file', onClick: () => createNewFileAndFocusTableRow('New file.txt', 'txt') },
    { text: 'New directory', onClick: () => createNewFileAndFocusTableRow('New folder', 'dir') },
  ];

  return (
    <>
      <HeaderNavigation
        location={location}
        changeDirectory={changeDirectory}
        makeDirectory={() => createNewFileAndFocusTableRow('New folder', 'dir')}
      />
      <TableWrapper
        ref={tableWrapperElement}
        onContextMenu={e =>
          openContextMenu(e, [tableWrapperElement.current as Element], tableContextMenuOptions)
        }
      >
        <ResizableTable ref={tableElement}>
          <thead>
            <TableHeaders sort={sort} setSort={setSort} tableRef={tableElement} />
          </thead>
          <tbody>{renderCurrentLocationFiles()}</tbody>
        </ResizableTable>
      </TableWrapper>
    </>
  );
};