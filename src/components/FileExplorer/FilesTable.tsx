import weakKey from 'weak-key';
import { Directory, Path } from 'interfaces/fs';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useWindowManagerContext } from 'components/Desktop';
import { TextEditor } from 'components/TextEditor';
import { useContextMenu } from 'utils/providers/ContextMenuProvider';
import { ContextMenuOption } from 'components/ContextMenu';
import { FileTableRow, EmptyFileTableRow } from './FileTableRow';
import { ResizableTable, ResizeHandle, TableWrapper } from './styled';

interface Props {
  location: Path;
  directories: { [key: string]: Directory };
  changeDirectory: (pathString: string) => string | null;
  renameFile: (pathString: string | Path, newName: string) => string | null;
}

const headers = ['Name', 'Date modified', 'Size', 'Type'];
const minCellWidth = 150;

const createHeaders = (headers: string[]) => {
  return headers.map(item => ({
    text: item,
    ref: useRef<HTMLTableCellElement>(),
  }));
};

export const FilesTable = ({ directories, changeDirectory, location, renameFile }: Props) => {
  const [tableHeight] = useState<string | number>('auto');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [renamingTableRowIndex, setRenamingTableRowIndex] = useState<number | null>(null);
  const tableElement = useRef<HTMLTableElement | null>(null);
  const tableRowElements = useRef<Array<HTMLTableRowElement | null>>([]);
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

  const handleFileDoubleClick = (filename: string, content: Directory) => {
    switch (content.type) {
      case 'dir': {
        changeDirectory(filename);
        return;
      }
      case 'txt': {
        console.log('location:', location);
        openWindow({
          id: window.crypto.randomUUID(),
          component: <TextEditor filePath={[...location, filename]} />,
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
    const files = Object.entries(directories);

    if (files.length === 0) {
      return <EmptyFileTableRow />;
    }

    return files.map(([fileName, content], idx) => {
      const rowContextMenuOptions: ContextMenuOption[] = [
        { text: 'Open', onClick: () => handleFileDoubleClick(fileName, content) },
        {
          text: 'Rename',
          onClick: () => setRenamingTableRowIndex(idx),
        },
      ];

      return (
        <FileTableRow
          onDoubleClick={() => handleFileDoubleClick(fileName, content)}
          content={content}
          fileName={fileName}
          key={weakKey(content)}
          onContextMenuCapture={e =>
            openContextMenu(e, [tableRowElements.current[idx] as Element], rowContextMenuOptions)
          }
          ref={el => (tableRowElements.current[idx] = el)}
          isRenaming={renamingTableRowIndex === idx}
          onRename={newName => {
            setRenamingTableRowIndex(null);
            renameFile([...location, fileName], newName);
          }}
          onRenameCancel={() => setRenamingTableRowIndex(null)}
        />
      );
    });
  };

  return (
    <TableWrapper>
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
  );
};
