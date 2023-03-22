import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
import RTLProvider from './theme/RTLProvider';
// components
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <RTLProvider>
          <ThemeProvider>
            <ScrollToTop />
            <Router />
          </ThemeProvider>
        </RTLProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
