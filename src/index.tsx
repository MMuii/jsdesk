import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from 'styles/global-styles';
import { ThemeProvider } from 'utils/ThemeProvider';
import { ShellProvider } from 'utils/ShellProvider';
import { Terminal } from 'components/Terminal';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ShellProvider>
        <GlobalStyles />
        <Terminal />
      </ShellProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
