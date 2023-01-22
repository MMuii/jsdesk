import React from 'react';
import { kebabCase, random } from 'lodash';
import { Binary } from 'utils/providers/ShellProvider';
import terminalThemes from 'styles/themes.json';
import { ColorBlocksContainer, ColorBlock } from './styled';

const themeNames = terminalThemes.map(theme => kebabCase(theme.name));

export const theme: Binary = ({ args, flags, terminate, setTheme, processCommand }) => {
  terminate();

  if (args.length === 0) {
    processCommand('help theme', 'theme');
    return null;
  }

  if (args[0] === 'ls') {
    if (flags['l']) {
      if (flags['c'] || flags['color']) {
        return () => (
          <div>
            {terminalThemes.map(theme => {
              return (
                <ColorBlocksContainer key={theme.name + theme.foreground}>
                  <div>{kebabCase(theme.name)}</div>
                  <ColorBlock style={{ background: theme.brightBlue }} />
                  <ColorBlock style={{ background: theme.brightRed }} />
                  <ColorBlock style={{ background: theme.brightGreen }} />
                  <ColorBlock style={{ background: theme.brightPurple }} />
                  <ColorBlock style={{ background: theme.brightYellow }} />
                  <ColorBlock style={{ background: theme.brightCyan }} />
                </ColorBlocksContainer>
              );
            })}
          </div>
        );
      }

      return () => (
        <div>
          {themeNames.map((themeName, index) => {
            return <div key={index}>{themeName}</div>;
          })}
        </div>
      );
    }

    return () => <div>{themeNames.join(', ')}</div>;
  }

  if (args[0] === 'set') {
    const theme = args[1];
    if (!theme) {
      return () => <div>Please provide name of a theme.</div>;
    }

    if (setTheme(theme)) {
      return () => <div>Theme set to {theme}</div>;
    }

    return () => <div>Theme {theme} not found</div>;
  }

  if (args[0] === 'random') {
    const randomTheme = terminalThemes[random(0, terminalThemes.length)].name;
    setTheme(randomTheme);
    return () => <div>Theme set to {randomTheme}</div>;
  }

  return null;
};
