import { WindowPopup, WindowPopupProps } from 'components/WindowPopup';
import { createContext, useCallback, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

type PopupProps<T> = Omit<WindowPopupProps<T>, 'isOpen' | 'onClose'>;

interface WindowPopupContextValue {
  openPopup: <T = {}>(props: PopupProps<T>) => void;
}

const WindowPopupContext = createContext({} as WindowPopupContextValue);
export const useWindowPopup = () => useContext(WindowPopupContext);

export const WindowPopupProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupProps, setPopupProps] = useState<PopupProps<any>>({} as PopupProps<{}>);

  const openPopup = useCallback(<T,>(props: PopupProps<T>) => {
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
