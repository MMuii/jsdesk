import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from 'styles/global-styles';
import { ShellProvider } from 'utils/providers/ShellProvider';
import { ThemeProvider } from 'utils/providers/ThemeProvider';
import { Terminal } from 'components/Terminal';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

localStorage.setItem('uptimeTimestamp', new Date().getTime().toString());

root.render(
  <React.StrictMode>
    <ShellProvider>
      <ThemeProvider>
        <GlobalStyles />
        <Terminal />
      </ThemeProvider>
    </ShellProvider>
  </React.StrictMode>,
);
