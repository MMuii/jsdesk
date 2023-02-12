import { useState } from 'react';

export interface RenderableWindow {
  component: React.ReactElement;
  id: string;
  name: string;
  windowProps?: {
    width?: number;
    height?: number;
  };
  componentProps?: object;
}

export const useWindowManager = (startingWindows: RenderableWindow[]) => {
  const [windows, setWindows] = useState<RenderableWindow[]>(startingWindows);
  const [zIndexList, setZIndexList] = useState<string[]>(startingWindows.map(window => window.id));

  const openWindow = ({ component, name, windowProps, componentProps }: RenderableWindow) => {
    const id = window.crypto.randomUUID();
    setWindows(prev => [...prev, { id, component, name, windowProps, componentProps }]);
    setZIndexList(prev => [id, ...prev]);
  };

  const focusWindow = (id: string) => {
    const windowToFocusIndex = zIndexList.findIndex(zIndexId => zIndexId === id);
    setZIndexList(prev => [...prev.splice(windowToFocusIndex, 1), ...prev]);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  return {
    windows,
    openWindow,
    closeWindow,
    zIndexList,
    focusWindow,
  };
};
