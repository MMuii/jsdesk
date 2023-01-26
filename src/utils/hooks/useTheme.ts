import { useEffect, useState } from 'react';
import { Theme } from 'interfaces/Theme';
import terminalThemes from 'styles/themes.json';
import { kebabCase } from 'lodash';

const themes: Theme[] = terminalThemes;
const defaultTheme = 'gruvbox-dark';

export const useTheme = (): [Theme, (name: string) => boolean] => {
  const [theme, setTermTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    console.log('theme:', theme);
  }, [theme]);

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

  return [theme, setTheme];
};
