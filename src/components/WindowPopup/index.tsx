import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { DimLayer, PopupContainer, Popup } from './styled';

export interface WindowPopupProps<T = any> {
  isOpen: boolean;
  onClose: () => void;
  ContentComponent: React.ComponentType<{ onAccept: () => void; onCancel: () => void }>;
  acceptCallback?: (value?: any) => void;
  cancelCallback?: () => void;
  fullWidth?: boolean;
  contentComponentProps?: T;
}

export const WindowPopup = ({
  isOpen,
  onClose,
  ContentComponent,
  acceptCallback,
  cancelCallback,
  fullWidth = false,
  contentComponentProps,
}: WindowPopupProps) => {
  const onAccept = useCallback(
    (value?: any) => {
      if (acceptCallback) acceptCallback(value);
      onClose();
    },
    [acceptCallback, onClose],
  );

  const onCancel = useCallback(() => {
    if (cancelCallback) cancelCallback();
    onClose();
  }, [cancelCallback, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onAccept();
      }

      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen, onAccept, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <DimLayer
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
          <PopupContainer>
            <Popup
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.15 }}
              $fullWidth={fullWidth}
            >
              <ContentComponent onAccept={onAccept} onCancel={onClose} {...contentComponentProps} />
            </Popup>
          </PopupContainer>
        </>
      )}
    </AnimatePresence>
  );
};
