import ReactDOM from 'react-dom/client';
import GlobalStyles from 'styles/global-styles';
import { ThemeProvider } from 'utils/providers/ThemeProvider';
import { Desktop } from 'components/Desktop';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

localStorage.setItem('uptimeTimestamp', new Date().getTime().toString());

root.render(
  // <React.StrictMode>
  <ThemeProvider>
    <GlobalStyles />
    <Desktop />
  </ThemeProvider>,
  // </React.StrictMode>,
);
