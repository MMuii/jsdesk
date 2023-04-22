import { useMemo } from 'react';
import { Button } from 'components/styled/Button';
import { FiHardDrive } from 'react-icons/fi';
import { useWindowPopup } from 'utils/providers/WindowPopupProvider';
import { DeleteAllDataPopup } from './DeleteAllDataPopup';
import { useFsSession } from 'utils/providers/FSSessionProvider';
import { SettingsRow, StorageBarContainer, StorageBarUsed } from './styled';
import { Separator } from '../styled';

const formatFileSize = (bytes: number) => {
  if (bytes >= 1048576) {
    return `${(bytes / 1048576).toFixed(2)} MB`;
  }

  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${bytes} B`;
};

export const MemoryTab = () => {
  const { resetFs } = useFsSession();
  const { openPopup } = useWindowPopup();

  const calculatedSpace = useMemo(() => {
    const fs = localStorage.getItem('fs') as string;
    return new Blob([...fs]).size;
  }, []);

  const deleteAllData = () => {
    openPopup({
      acceptCallback: resetFs,
      ContentComponent: DeleteAllDataPopup,
    });
  };

  return (
    <>
      <h2>Memory</h2>
      <Separator />
      <SettingsRow>
        <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FiHardDrive /> LocalStorage HD
        </span>
        <span>{formatFileSize(calculatedSpace)} of 4MB in usage</span>
      </SettingsRow>
      <StorageBarContainer>
        <StorageBarUsed $percentageUsed={calculatedSpace / 4194304} />
        <div>
          {formatFileSize(4194304 - calculatedSpace)}, {100 - Math.round(calculatedSpace / 4194304)}
          % free
        </div>
      </StorageBarContainer>
      <Button $variant="cancel" style={{ marginTop: 'auto' }} onClick={deleteAllData}>
        Delete all data
      </Button>
    </>
  );
};
