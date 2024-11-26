import './polyfills';
import './globals.css';
import '@i18n/i18n';
import { render } from '@reactunity/renderer';
import { MemoryRouter } from 'react-router-dom';
import { useAlert } from '@lib/hooks';
import Alert from '@components/modals/Alert';
import { AlertContext } from '@components/modals/AlertContext';
import ModalProvider from 'src/providers/ModalProvider';
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
        <ModalProvider>
          <AppRoutes />
        </ModalProvider>
      </AlertContext.Provider>
    </MemoryRouter>
  );
}

render(<App />);
