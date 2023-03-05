import weakKey from 'weak-key';
import { Path } from 'interfaces/fs';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useWindowManagerContext } from 'components/Desktop';
import { TextEditor } from 'components/TextEditor';
import { useContextMenu } from 'utils/providers/ContextMenuProvider';
import { ContextMenuOption } from 'components/ContextMenu';
import { File } from 'utils/hooks/useFileSystem/File';
import { FileTableRow, EmptyFileTableRow } from './FileTableRow';
import { ResizableTable, ResizeHandle, TableWrapper } from './styled';
import { HeaderNavigation } from './HeaderNavigation';

interface Props {
  location: Path;
  directories: File[];
  changeDirectory: (pathString: string | Path) => string | void;
  moveFile: (path: string | Path, newPath: string | Path) => string | void;
  removeFile: (path: string | Path) => string | void;
  makeFile: (path: string | Path, type: string, addEvenIfExists?: boolean) => string | void;
}

const headers = ['Name', 'Date modified', 'Size', 'Type'];
const minCellWidth = 150;

const createHeaders = (headers: string[]) => {
  return headers.map(item => ({
    text: item,
    ref: useRef<HTMLTableCellElement>(),
  }));
};

export const FilesTable = ({
  directories,
  changeDirectory,
  location,
  moveFile,
  removeFile,
  makeFile,
}: Props) => {
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

  const mouseDown = (index: number) => {
    setActiveIndex(index);
  };

  const handleFileDoubleClick = (file: File) => {
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
    if (directories.length === 0) {
      return <EmptyFileTableRow />;
    }

    return directories.map((file, idx) => {
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
    setRenamingTableRowIndex(directories.length);
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
            <tr>
              {columns.map(({ text, ref }, i) => (
                // @ts-ignore
                <th ref={ref} key={text}>
                  <span>{text}</span>
                  <ResizeHandle
                    style={{ height: tableHeight }}
                    onMouseDown={() => mouseDown(i)}
                    className={`resize-handle ${activeIndex === i ? 'active' : 'idle'}`}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderCurrentLocationFiles()}</tbody>
        </ResizableTable>
      </TableWrapper>
    </>
  );
};
