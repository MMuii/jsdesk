import { createContext, useContext } from 'react';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';

interface Directory {
  files: { [key: string]: Directory };
  type: string;
}

interface FileSystem {
  '/': Directory;
}

const initialFs: FileSystem = {
  '/': {
    type: 'dir',
    files: {
      img: {
        type: 'dir',
        files: {
          dupa: {
            type: 'dir',
            files: {
              'file.txt': {
                type: 'file',
                // @ts-ignore
                value: 'value',
              },
            },
          },
          cyce: {
            type: 'dir',
            files: {},
          },
          wadowice: {
            type: 'dir',
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
