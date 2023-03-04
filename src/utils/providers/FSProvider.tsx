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

const textFile: JSONFile = {
  files: [],
  type: 'txt',
  updatedAt: new Date().toISOString(),
  name: 'poem.txt',
  isDirectory: false,
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  path: ['/', 'poem.txt'],
};

const fileSystemRoot: JSONFile = {
  files: [documentsDir, textFile],
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
