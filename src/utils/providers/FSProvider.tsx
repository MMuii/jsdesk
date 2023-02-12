import { FileSystem } from 'interfaces/fs';
import { createContext, useContext } from 'react';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';

const initialFs: FileSystem = {
  '/': {
    type: 'dir',
    updatedAt: new Date().toISOString(),
    files: {
      img: {
        type: 'dir',
        updatedAt: new Date().toISOString(),
        files: {
          dupa: {
            type: 'dir',
            updatedAt: new Date().toISOString(),
            files: {
              'file.txt': {
                type: 'txt',
                updatedAt: new Date().toISOString(),
                // @ts-ignore
                value: 'value',
              },
            },
          },
          cyce: {
            type: 'dir',
            updatedAt: new Date().toISOString(),
            files: {},
          },
          wadowice: {
            type: 'dir',
            updatedAt: new Date().toISOString(),
            files: {},
          },
        },
      },
    },
  },
};

interface Props {
  children: React.ReactNode;
}

type ContextValue = [FileSystem, (value: FileSystem | ((val: FileSystem) => FileSystem)) => void];

const FSContext = createContext({} as ContextValue);
export const useFsContext = () => useContext(FSContext);

export const FSProvider = ({ children }: Props) => {
  const [fs, setFs] = useLocalStorage('fs', initialFs);
  return <FSContext.Provider value={[fs, setFs]}>{children}</FSContext.Provider>;
};
