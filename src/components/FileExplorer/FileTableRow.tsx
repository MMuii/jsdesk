import { forwardRef, useEffect, useState } from 'react';
import { Directory } from 'interfaces/fs';
import { getIconByFileType } from 'utils/fs/getIconByFileType';
import { FileTableRow as StyledTableRow, FileTableRowInput } from './styled';

interface Props {
  onDoubleClick: () => void;
  content: Directory;
  fileName: string;
  onContextMenuCapture: (e: React.MouseEvent) => void;
  isRenaming: boolean;
  onRename: (newName: string) => void;
  onRenameCancel: () => void;
}

export const FileTableRow = forwardRef<HTMLTableRowElement, Props>(
  (
    {
      onDoubleClick,
      content,
      onContextMenuCapture,
      fileName,
      isRenaming,
      onRename,
      onRenameCancel,
    },
    ref,
  ) => {
    const [renamedName, setRenamedName] = useState(fileName);

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
        return <span>{fileName}</span>;
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

    return (
      <StyledTableRow
        onDoubleClick={onDoubleClick}
        ref={ref}
        onContextMenuCapture={onContextMenuCapture}
        $type={content.type}
        $isRenaming={isRenaming}
      >
        <td tabIndex={0}>
          <>
            {getIconByFileType(content.type)}
            {renderFileName()}
          </>
        </td>
        <td tabIndex={0}>
          <span>{new Date(content.updatedAt).toLocaleString()}</span>
        </td>
        <td tabIndex={0}>
          <span>120 kB</span>
        </td>
        <td tabIndex={0}>
          <span>{content.type}</span>
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
