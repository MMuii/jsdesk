import { useState } from 'react';

export interface RenderableWindow {
  component: React.ReactElement;
  id: string;
  name: string;
  props?: object;
}

export const useWindowManager = (startingWindows: RenderableWindow[]) => {
  const [windows, setWindows] = useState<RenderableWindow[]>(startingWindows);
  const [zIndexList, setZIndexList] = useState<string[]>(startingWindows.map(window => window.id));

  const addWindow = (component: React.ReactElement, name: string) => {
    const id = window.crypto.randomUUID();
    setWindows(prev => [...prev, { id, component, name }]);
    setZIndexList(prev => [id, ...prev]);
  };

  const focusWindow = (id: string) => {
    const windowToFocusIndex = zIndexList.findIndex(zIndexId => zIndexId === id);
    setZIndexList(prev => [...prev.splice(windowToFocusIndex, 1), ...prev]);
  };

  return {
    windows,
    addWindow,
    zIndexList,
    focusWindow,
  };
};
