import { ContextMenu, ContextMenuOption } from 'components/ContextMenu';
import { createContext, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface Position {
  x: number;
  y: number;
}

interface ContextMenuContextValue {
  openContextMenu: (
    e: React.MouseEvent,
    triggerRefs: Element[],
    options: ContextMenuOption[],
  ) => void;
}

const ContextMenuContext = createContext({} as ContextMenuContextValue);
export const useContextMenu = () => useContext<ContextMenuContextValue>(ContextMenuContext);

export const ContextMenuProvider = ({ children }: Props) => {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ContextMenuOption[]>([]);

  const openContextMenu = (
    e: React.MouseEvent,
    triggerRefs: Element[],
    options: ContextMenuOption[],
  ) => {
    if (!triggerRefs.some(triggerRef => triggerRef.contains(e.target as Element))) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    setPos({ x: e.clientX + 5, y: e.clientY });
    setOptions(options);
    setIsOpen(true);
  };

  const closeContextMenu = () => setIsOpen(false);

  return (
    <ContextMenuContext.Provider value={{ openContextMenu }}>
      {isOpen && (
        <OutsideClickCatcher
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(false);
          }}
        />
      )}
      <ContextMenu
        x={pos.x}
        y={pos.y}
        isOpen={isOpen}
        options={options}
        onClose={closeContextMenu}
      />
      {children}
    </ContextMenuContext.Provider>
  );
};

const OutsideClickCatcher = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => (
  <div
    onClick={onClick}
    onContextMenuCapture={onClick}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '100vw',
      opacity: 0,
      zIndex: 9999,
    }}
  />
);
