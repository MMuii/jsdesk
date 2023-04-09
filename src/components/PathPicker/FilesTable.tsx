import { EmptyFileTableRow } from 'components/apps/FileExplorer/FileTableRow';
import { HeaderNavigation } from 'components/apps/FileExplorer/HeaderNavigation';
import { FileTableRow } from 'components/apps/FileExplorer/FileTableRow';
import { TableWrapper, ResizableTable } from 'components/apps/FileExplorer/styled';
import { TableHeaders } from 'components/apps/FileExplorer/TableHeaders';
import { Path } from 'interfaces/fs';
import { FileWithSize, useFilesTable } from 'utils/hooks/useFilesTable';
import { File, FileType } from 'utils/hooks/useFileSystem/File';
import weakKey from 'weak-key';
import { useRef, useState } from 'react';

interface Props {
  location: Path;
  currentDirRef: File;
  changeDirectory: (pathString: string | Path) => string | void;
  onDirectorySelect: (dir: Path) => void;
  moveFile: (path: string | Path, newPath: string | Path) => string | void;
  makeFile: (path: string | Path, type: string, addEvenIfExists?: boolean) => string | void;
  displayedFileTypes?: string[];
}

export const FilesTable = ({
  location,
  currentDirRef,
  changeDirectory,
  onDirectorySelect,
  moveFile,
  makeFile,
  displayedFileTypes,
}: Props) => {
  const { dirs, sort, setSort, getSortFn } = useFilesTable(currentDirRef);
  const [renamingTableRowIndex, setRenamingTableRowIndex] = useState<number | null>(null);
  const tableElement = useRef<HTMLTableElement | null>(null);
  const tableRowElements = useRef<Array<HTMLTableRowElement | null>>([]);

  const handleFileDoubleClick = (file: FileType) => {
    switch (file.type) {
      case 'dir': {
        changeDirectory(file.name);
        return;
      }
      default: {
        onDirectorySelect(file.path);
        return;
      }
    }
  };

  const renderCurrentLocationFiles = () => {
    if (dirs.length === 0) {
      return <EmptyFileTableRow />;
    }

    const filteredDirs = displayedFileTypes?.length
      ? dirs.filter(dir => displayedFileTypes.includes(dir.type))
      : dirs;

    return filteredDirs.map((file, idx) => {
      return (
        <FileTableRow
          onDoubleClick={() => handleFileDoubleClick(file)}
          file={file}
          key={weakKey(file)}
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

  return (
    <>
      <HeaderNavigation
        location={location}
        changeDirectory={changeDirectory}
        makeDirectory={() => createNewFileAndFocusTableRow('New folder', 'dir')}
      />
      <TableWrapper>
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
