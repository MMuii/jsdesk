import React, { useState, useContext, useEffect, createContext } from 'react';
import { Theme } from 'interfaces/Theme';
import terminalThemes from 'styles/themes.json';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { kebabCase } from 'lodash';

const themes: Theme[] = terminalThemes;
const defaultTheme = 'gruvbox-dark';

interface ThemeContextValue {
  setTheme: (name: string) => boolean;
  theme: Theme;
}

interface Props {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTermTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    setTheme(savedTheme || defaultTheme);
  }, []);

  const setTheme = (name: string): boolean => {
    const theme = themes.find(theme => kebabCase(theme.name) === kebabCase(name));

    if (!theme) {
      console.log(`No theme ${name} found`);
      return false;
    }

    setTermTheme(theme);
    localStorage.setItem('theme', name);
    return true;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
};
