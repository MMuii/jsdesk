import { useAppTheme } from 'utils/providers/ThemeProvider';
import { Separator } from '../styled';
import { SettingsRow, ThemesPreviewsContainer } from './styled';
import terminalThemes from 'styles/themes.json';
import { ThemePreview } from './ThemePreview';
import { useMemo } from 'react';

export const ThemeTab = () => {
  const [theme, setTheme] = useAppTheme();

  const themePreviews = useMemo(() => {
    return terminalThemes.map(theme => (
      <ThemePreview key={theme.name} theme={theme} onClick={() => setTheme(theme.name)} />
    ));
  }, [setTheme]);

  return (
    <>
      <h2>Theme</h2>
      <Separator />
      <SettingsRow>
        <span>Current theme:</span>
        <span>{theme.name}</span>
      </SettingsRow>
      <ThemesPreviewsContainer>{themePreviews}</ThemesPreviewsContainer>
    </>
  );
};
