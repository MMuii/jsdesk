import { createContext, useContext } from 'react';
import { useFileSystem } from 'utils/hooks/useFileSystem';

interface Props {
  children: React.ReactNode;
}

type ContextValue = ReturnType<typeof useFileSystem>;

const FSContext = createContext({} as ContextValue);
export const useFs = () => useContext(FSContext);

export const FSProvider = ({ children }: Props) => {
  const fs = useFileSystem();
  return <FSContext.Provider value={fs}>{children}</FSContext.Provider>;
};
