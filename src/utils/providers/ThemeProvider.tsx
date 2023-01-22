import React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { useShell } from 'utils/providers/ShellProvider';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const { theme } = useShell();

  return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>;
};
