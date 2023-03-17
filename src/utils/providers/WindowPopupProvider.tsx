import { WindowPopup, WindowPopupProps } from 'components/WindowPopup';
import { createContext, useCallback, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface WindowPopupContextValue {
  openPopup: (props: PopupProps) => void;
}

const WindowPopupContext = createContext({} as WindowPopupContextValue);
export const useWindowPopup = () => useContext(WindowPopupContext);

type PopupProps = Omit<WindowPopupProps, 'isOpen' | 'onClose'>;

export const WindowPopupProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupProps, setPopupProps] = useState<PopupProps>({ title: 'Popup' });

  const openPopup = useCallback((props: PopupProps) => {
    setPopupProps(props);
    setIsOpen(true);
  }, []);

  return (
    <WindowPopupContext.Provider value={{ openPopup }}>
      <WindowPopup isOpen={isOpen} onClose={() => setIsOpen(false)} {...popupProps} />
      {children}
    </WindowPopupContext.Provider>
  );
};
