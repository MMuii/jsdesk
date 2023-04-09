import { useEffect, useState } from 'react';
import { File, FileType } from 'utils/hooks/useFileSystem/File';

export type FileWithSize = FileType & { size: number | null };

export enum SortColumn {
  name = 0,
  dateModified,
  size,
  type,
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

export interface Sort {
  col: SortColumn;
  order: SortOrder;
}

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

export const useFilesTable = (dirRef: File) => {
  const [dirs, setDirs] = useState<FileWithSize[]>([]);
  const [sort, setSort] = useState<Sort>({ col: SortColumn.name, order: SortOrder.asc });

  useEffect(() => {
    const dirsWithSize = dirRef.files.map(dir => ({
      ...dir,
      size: calculateFileSize(dir),
    }));

    const sortFn = getSortFn(sort.col, sort.order);
    const sortedDirectories = dirsWithSize.sort(sortFn);
    setDirs(sortedDirectories);
  }, [sort, dirRef]);

  return { dirs, sort, setSort, getSortFn };
};
