import { forwardRef, useEffect, useState } from 'react';
import { getIconByFileType } from 'utils/fs/getIconByFileType';
import {
  FileTableRow as StyledTableRow,
  FileTableRowInput,
} from 'components/apps/FileExplorer/styled';
import { FileWithSize } from 'components/apps/FileExplorer/FilesTable';

interface Props {
  onDoubleClick: () => void;
  file: FileWithSize;
  onContextMenuCapture: (e: React.MouseEvent) => void;
  isRenaming: boolean;
  onRename: (newName: string) => void;
  onRenameCancel: () => void;
}

export const FileTableRow = forwardRef<HTMLTableRowElement, Props>(
  ({ onDoubleClick, onContextMenuCapture, isRenaming, onRename, onRenameCancel, file }, ref) => {
    const [renamedName, setRenamedName] = useState(file.name);

    useEffect(() => {
      const escHandler = (e: KeyboardEvent) => {
        if (!isRenaming) {
          return;
        }

        if (e.key === 'Escape') {
          onRenameCancel();
        }

        if (e.key === 'Enter' && renamedName.trim().length > 0) {
          onRename(renamedName.trim());
        }
      };

      document.addEventListener('keydown', escHandler);
      return () => {
        document.removeEventListener('keydown', escHandler);
      };
    }, [isRenaming, onRenameCancel, onRename, renamedName]);

    const renderFileName = () => {
      if (!isRenaming) {
        return <span>{file.name}</span>;
      }

      const onInputBlur = () => {
        const trimmedName = renamedName.trim();
        if (trimmedName.length > 0) {
          onRename(renamedName);
        } else {
          onRenameCancel();
        }
      };

      return (
        <FileTableRowInput
          type="text"
          value={renamedName}
          onChange={e => setRenamedName(e.target.value)}
          onBlur={onInputBlur}
          autoFocus
        />
      );
    };

    const formatFileSize = (bytes: number) => {
      if (bytes >= 1048576) {
        return `${(bytes / 1048576).toFixed(2)} MB`;
      }

      if (bytes >= 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
      }

      return `${bytes} B`;
    };

    return (
      <StyledTableRow
        onDoubleClick={onDoubleClick}
        ref={ref}
        onContextMenuCapture={onContextMenuCapture}
        $type={file.type}
        $isRenaming={isRenaming}
      >
        <td tabIndex={0}>
          <>
            {getIconByFileType(file.type)}
            {renderFileName()}
          </>
        </td>
        <td tabIndex={0}>
          <span>{new Date(file.updatedAt).toLocaleString()}</span>
        </td>
        <td tabIndex={0}>
          <span>{file.size === null ? '-' : formatFileSize(file.size)}</span>
        </td>
        <td tabIndex={0}>
          <span>{file.type}</span>
        </td>
      </StyledTableRow>
    );
  },
);

export const EmptyFileTableRow = () => (
  <StyledTableRow $type="" style={{ pointerEvents: 'none' }} $isRenaming={false}>
    <td tabIndex={0}>
      <span>Directory is empty</span>
    </td>
    <td tabIndex={0}>
      <span>-</span>
    </td>
    <td tabIndex={0}>
      <span>-</span>
    </td>
    <td tabIndex={0}>
      <span>-</span>
    </td>
  </StyledTableRow>
);
