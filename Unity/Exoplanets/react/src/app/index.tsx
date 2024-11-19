import './polyfills';
import './globals.css';
import '@i18n/i18n';
import { render } from '@reactunity/renderer';
import { MemoryRouter } from 'react-router-dom';
import { useAlert } from '@lib/hooks';
import Alert from '@components/alerts/Alert';
import { AlertContext } from '@components/alerts/AlertContext';
import AppRoutes from './routes';

function App() {
  const {
    alertOptions, hideAlert, showAlert, isVisible,
  } = useAlert();

  return (
    <MemoryRouter
      initialEntries={[`/${global.location.hash.replace(/^#/, '')}`]}
      initialIndex={0}
    >
      <AlertContext.Provider value={showAlert}>
        {
          isVisible && <Alert alertOptions={alertOptions} hideAlert={hideAlert} />
        }
        <AppRoutes />
      </AlertContext.Provider>
    </MemoryRouter>
  );
}

render(<App />);
