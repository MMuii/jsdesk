import { createContext, useCallback, useContext, useState } from 'react';
import { JSONFile, File } from 'utils/hooks/useFileSystem/File';
import { FileSystem } from 'utils/hooks/useFileSystem/FileSystem';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';

const documentsDir: JSONFile = {
  files: [],
  type: 'dir',
  updatedAt: new Date().toISOString(),
  name: 'documents',
  isDirectory: true,
  content: null,
  path: ['/', 'documents'],
};

const fileSystemRoot: JSONFile = {
  files: [documentsDir],
  type: 'dir',
  updatedAt: new Date().toISOString(),
  name: '/',
  isDirectory: true,
  content: null,
  path: ['/'],
};

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  root: File;
  setRoot(root: File): void;
}

const FSContext = createContext({} as ContextValue);
export const useFsContext = () => useContext(FSContext);

export const FSProvider = ({ children }: Props) => {
  const [localStorageFs, setLocalStorageFs] = useLocalStorage('fs', fileSystemRoot);
  const [root, setRoot] = useState(FileSystem.parseRoot(localStorageFs));

  const setRootWithLocalStorageSync = useCallback(
    (root: File) => {
      setLocalStorageFs(root);
      setRoot(root);
    },
    [setLocalStorageFs],
  );

  return (
    <FSContext.Provider value={{ root, setRoot: setRootWithLocalStorageSync }}>
      {children}
    </FSContext.Provider>
  );
};
