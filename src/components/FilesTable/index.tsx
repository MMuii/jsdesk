import { useRef, useState } from 'react';
import weakKey from 'weak-key';
import { FileWithSize, useFilesTable } from 'utils/hooks/useFilesTable';
import { EmptyFileTableRow, FileTableRow } from './FileTableRow';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { ContextMenuOption } from 'components/ContextMenu';
import { ResizableTable, TableWrapper } from './styled';
import { HeaderNavigation } from './HeaderNavigation';
import { useContextMenu } from 'utils/providers/ContextMenuProvider';
import { TableHeaders } from './TableHeaders';

export interface TableRowContextMenuOnClickArgs {
  file: FileWithSize;
  idx: number;
  rename: () => void;
  remove: () => void;
}

export interface FilesTableProps {
  fsSession: ReturnType<typeof useFsSession>;
  handleFileDoubleClick: (file: FileWithSize) => void;
  displayedFileTypes?: string[];
  tableContextMenuOptions?: ContextMenuOption[];
  tableRowContextMenuOptions?: ContextMenuOption[];
}

export const FilesTable = ({
  fsSession,
  handleFileDoubleClick,
  displayedFileTypes,
  tableContextMenuOptions,
  tableRowContextMenuOptions,
}: FilesTableProps) => {
  const {
    location,
    getCurrentDirRef,
    changeDirectory,
    makeFileRelative,
    moveFileAbsolute,
    removeDirectory,
  } = fsSession;
  const currentDirRef = getCurrentDirRef();
  const { dirs, sort, setSort, getSortFn } = useFilesTable(currentDirRef);
  const [renamingTableRowIndex, setRenamingTableRowIndex] = useState<number | null>(null);
  const tableElement = useRef<HTMLTableElement | null>(null);
  const tableRowElements = useRef<Array<HTMLTableRowElement | null>>([]);
  const tableWrapperElement = useRef<HTMLDivElement | null>(null);
  const { openContextMenu } = useContextMenu();

  const renderCurrentLocationFiles = () => {
    if (dirs.length === 0) {
      return <EmptyFileTableRow />;
    }

    const filteredDirs = displayedFileTypes?.length
      ? dirs.filter(dir => displayedFileTypes.includes(dir.type))
      : dirs;

    return filteredDirs.map((file, idx) => {
      const getRowContextMenuOpenHandler = (e: React.MouseEvent) => {
        if (!tableRowContextMenuOptions) {
          return undefined;
        }

        const options = tableRowContextMenuOptions.map(tableRowContextMenuOption => {
          return {
            ...tableRowContextMenuOption,
            onClick: () =>
              tableRowContextMenuOption.onClick(e, {
                file,
                idx,
                remove: () => removeDirectory(file.path),
                rename: () => setRenamingTableRowIndex(idx),
              }),
          };
        });

        return openContextMenu(e, [tableRowElements.current[idx] as Element], options);
      };

      return (
        <FileTableRow
          onDoubleClick={() => handleFileDoubleClick(file)}
          file={file}
          key={weakKey(file)}
          onContextMenuCapture={getRowContextMenuOpenHandler}
          ref={el => (tableRowElements.current[idx] = el)}
          isRenaming={renamingTableRowIndex === idx}
          onRename={newName => {
            setRenamingTableRowIndex(null);
            moveFileAbsolute(file.path, [...file.path.slice(0, -1), newName]);
          }}
          onRenameCancel={() => setRenamingTableRowIndex(null)}
        />
      );
    });
  };

  const createNewFileAndFocusTableRow = (name: string, type: string) => {
    makeFileRelative([name], type, true);
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

  const getContextMenuOptions = (): ContextMenuOption[] => {
    const defaultContextMenuOptions = [
      { text: 'New file', onClick: () => createNewFileAndFocusTableRow('New file.txt', 'txt') },
      { text: 'New directory', onClick: () => createNewFileAndFocusTableRow('New folder', 'dir') },
    ];

    return tableContextMenuOptions
      ? [...defaultContextMenuOptions, ...tableContextMenuOptions]
      : [...defaultContextMenuOptions];
  };

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
          openContextMenu(e, [tableWrapperElement.current as Element], getContextMenuOptions())
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
