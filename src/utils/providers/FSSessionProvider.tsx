import { createContext, useContext } from 'react';
import { useFileSystem } from 'utils/hooks/useFileSystem';

interface Props {
  children: React.ReactNode;
}

type ContextValue = ReturnType<typeof useFileSystem>;

const FSSessionContext = createContext({} as ContextValue);

export const useFsSession = () => useContext(FSSessionContext);

export const FSSessionProvider = ({ children }: Props) => {
  const fs = useFileSystem();

  return <FSSessionContext.Provider value={fs}>{children}</FSSessionContext.Provider>;
};
