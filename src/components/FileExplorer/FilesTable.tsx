import { useState, useRef, useEffect, useCallback } from 'react';
import weakKey from 'weak-key';
import { Path } from 'interfaces/fs';
import { HiArrowSmDown } from 'react-icons/hi';
import { useWindowManagerContext } from 'components/Desktop';
import { TextEditor } from 'components/TextEditor';
import { useContextMenu } from 'utils/providers/ContextMenuProvider';
import { ContextMenuOption } from 'components/ContextMenu';
import { File, FileType } from 'utils/hooks/useFileSystem/File';
import { FileTableRow, EmptyFileTableRow } from './FileTableRow';
import { ResizableTable, ResizeHandle, TableWrapper } from './styled';
import { HeaderNavigation } from './HeaderNavigation';
import { current } from 'immer';

interface Props {
  location: Path;
  currentDirRef: File;
  // directories: FileType[];
  changeDirectory: (pathString: string | Path) => string | void;
  moveFile: (path: string | Path, newPath: string | Path) => string | void;
  removeFile: (path: string | Path) => string | void;
  makeFile: (path: string | Path, type: string, addEvenIfExists?: boolean) => string | void;
}

export type FileWithSize = FileType & { size: number | null };

enum SortColumn {
  name = 0,
  dateModified,
  size,
  type,
}

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

interface Sort {
  col: SortColumn;
  order: SortOrder;
}

const headers = ['Name', 'Date modified', 'Size', 'Type'];
const minCellWidth = 150;

const createHeaders = (headers: string[]) => {
  return headers.map(item => ({
    text: item,
    ref: useRef<HTMLTableCellElement>(),
  }));
};

const calculateFileSize = (file: FileType): number | null => {
  if (file.type === 'dir') {
    return null;
  }

  return new Blob([...file.content]).size;
};

const getSortFn = (
  col: SortColumn,
  order: SortOrder,
): ((fileA: FileWithSize, fileB: FileWithSize) => number) => {
  switch (col) {
    case SortColumn.name:
      if (order === SortOrder.asc) return (a, b) => a.name.localeCompare(b.name);
      return (a, b) => b.name.localeCompare(a.name);
    case SortColumn.type:
      if (order === SortOrder.asc) return (a, b) => a.type.localeCompare(b.type);
      return (a, b) => b.type.localeCompare(a.type);
    case SortColumn.dateModified:
      if (order === SortOrder.asc)
        return (a, b) => (new Date(a.updatedAt) > new Date(b.updatedAt) ? 1 : 0);
      return (a, b) => (new Date(b.updatedAt) > new Date(a.updatedAt) ? 1 : 0);
    case SortColumn.size:
      if (order === SortOrder.asc)
        return (a, b) => {
          if (a.size === null) return -1;
          if (b.size === null) return 1;
          return a > b ? 1 : 0;
        };
      return (a, b) => {
        if (a.size === null) return 1;
        if (b.size === null) return -1;
        return b > a ? 1 : 0;
      };
  }
};

export const FilesTable = ({
  // directories,
  currentDirRef,
  changeDirectory,
  location,
  moveFile,
  removeFile,
  makeFile,
}: Props) => {
  const [dirs, setDirs] = useState<FileWithSize[]>([]);
  const [sort, setSort] = useState<Sort>({ col: SortColumn.name, order: SortOrder.asc });
  const [tableHeight] = useState<string | number>('auto');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [renamingTableRowIndex, setRenamingTableRowIndex] = useState<number | null>(null);
  const tableElement = useRef<HTMLTableElement | null>(null);
  const tableRowElements = useRef<Array<HTMLTableRowElement | null>>([]);
  const tableWrapperElement = useRef<HTMLDivElement | null>(null);
  const columns = createHeaders(headers);
  const { openWindow } = useWindowManagerContext();
  const { openContextMenu } = useContextMenu();

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      const gridColumns = columns.map((col, i) => {
        if (i === activeIndex) {
          const rectLeft = col.ref.current!.getBoundingClientRect().left;
          const width = e.clientX - rectLeft;

          if (width >= minCellWidth) {
            return `${width}px`;
          }
        }

        return `${col.ref.current!.offsetWidth}px`;
      });

      tableElement.current!.style.gridTemplateColumns = `${gridColumns.join(' ')}`;
    },
    [activeIndex, columns],
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  useEffect(() => {
    const dirsWithSize = currentDirRef.files.map(dir => ({
      ...dir,
      size: calculateFileSize(dir),
    }));

    const sortFn = getSortFn(sort.col, sort.order);
    const sortedDirectories = dirsWithSize.sort(sortFn);
    setDirs(sortedDirectories);
  }, [sort, currentDirRef]);

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

  const renderTableHeaders = () => {
    return columns.map(({ text, ref }, i) => {
      const sortingByThisCol = sort.col === i;

      const handleClick = () => {
        const getNewSortOrder = (currentSort: Sort): Sort['order'] => {
          if (currentSort.col === i) {
            return currentSort.order === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
          }

          return SortOrder.asc;
        };

        setSort(currentSort => ({ col: i, order: getNewSortOrder(currentSort) }));
      };

      return (
        // @ts-ignore
        <th ref={ref} key={text}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
            onClick={handleClick}
          >
            <span>{text}</span>
            {sortingByThisCol && (
              <HiArrowSmDown
                style={{ transform: `rotate(${sort.order === 'desc' ? 0 : 180}deg)` }}
              />
            )}
          </div>
          <ResizeHandle
            style={{ height: tableHeight }}
            onMouseDown={() => setActiveIndex(i)}
            className={`resize-handle ${activeIndex === i ? 'active' : 'idle'}`}
          />
        </th>
      );
    });
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
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>{renderCurrentLocationFiles()}</tbody>
        </ResizableTable>
      </TableWrapper>
    </>
  );
};
