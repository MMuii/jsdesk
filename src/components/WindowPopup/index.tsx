import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { DimLayer, PopupContainer, Popup } from './styled';

export interface WindowPopupProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  popupText?: string;
  acceptText?: string;
  cancelText?: string;
  acceptCallback?: () => void;
  cancelCallback?: () => void;
}

export const WindowPopup = ({
  title,
  isOpen,
  onClose,
  popupText,
  acceptText = 'Ok',
  cancelText = 'Cancel',
  acceptCallback,
  cancelCallback,
}: WindowPopupProps) => {
  const onAccept = useCallback(() => {
    if (acceptCallback) acceptCallback();
    onClose();
  }, [acceptCallback, onClose]);

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
          <PopupContainer id="popup-container">
            <Popup
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.15 }}
            >
              <h2>{title}</h2>
              {popupText && <p>{popupText}</p>}
              <div>
                <button onClick={onAccept}>{acceptText}</button>
                <button onClick={onCancel}>{cancelText}</button>
              </div>
            </Popup>
          </PopupContainer>
        </>
      )}
    </AnimatePresence>
  );
};
