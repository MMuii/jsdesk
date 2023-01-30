import React, { createContext, useContext } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { useTheme } from 'utils/hooks/useTheme';

interface Props {
  children: React.ReactNode;
}

const ThemeContext = createContext([] as any);
export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useTheme();

  return (
    <StyledComponentsThemeProvider theme={theme}>
      <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
    </StyledComponentsThemeProvider>
  );
};
