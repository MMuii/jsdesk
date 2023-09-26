import ReactDOM from 'react-dom/client';
import GlobalStyles from 'styles/global-styles';
import { ThemeProvider } from 'utils/providers/ThemeProvider';
import { Desktop } from 'components/Desktop';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { FSProvider } from 'utils/providers/FSProvider';
import { ContextMenuProvider } from 'utils/providers/ContextMenuProvider';
import 'styles/reactPdfStyles.css';
import 'react-folder-tree/dist/style.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

localStorage.setItem('uptimeTimestamp', new Date().getTime().toString());

root.render(
  <FSProvider>
    <ThemeProvider>
      <ContextMenuProvider>
        <GlobalStyles />
        <Desktop />
      </ContextMenuProvider>
    </ThemeProvider>
  </FSProvider>,
);
