import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// datepicker
import { LocalizationProvider, faIR } from '@mui/x-date-pickers';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
import RTLProvider from './theme/RTLProvider';
// components
import ScrollToTop from './components/scroll-to-top';
// context
import Context from './store';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Context>
          <RTLProvider>
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDateFnsJalali} localeText={faIR.components.MuiLocalizationProvider.defaultProps.localeText}>
                <ScrollToTop />
                <Router />
              </LocalizationProvider>
            </ThemeProvider>
          </RTLProvider>
        </Context>
      </BrowserRouter>
    </HelmetProvider>
  );
}
