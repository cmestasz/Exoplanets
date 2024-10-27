import { render } from '@reactunity/renderer';
import './globals.css';
import '@i18n/i18n';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="text-white">{t('components.form.input.error-update')}</h1>
      <h2 className="text-white">ods</h2>
    </>
  );
}

render(<App />);
