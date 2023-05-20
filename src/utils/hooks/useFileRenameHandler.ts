import { useEffect, useState } from 'react';

interface Config {
  currentName: string;
  isRenaming: boolean;
  onRename: (newName: string) => void;
  onRenameCancel: () => void;
}

export const useFileRenameHandler = ({
  currentName,
  isRenaming,
  onRename,
  onRenameCancel,
}: Config) => {
  const [renamedName, setRenamedName] = useState(currentName);

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
    return () => document.removeEventListener('keydown', escHandler);
  }, [isRenaming, onRenameCancel, onRename, renamedName]);

  return [renamedName, setRenamedName];
};
