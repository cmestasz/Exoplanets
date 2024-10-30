import { render } from '@reactunity/renderer';
import './globals.css';
import '@i18n/i18n';
import { useTranslation } from 'react-i18next';
import AstrosSlider from '@components/astros/AstrosSlider';
import { kepler22b, proximaCentauriB } from '@lib/mock';
import Input from '@components/form/input/Input';
import { useAlert } from '@lib/hooks';
import Alert, { AlertContext } from '@components/alerts/Alert';

function App() {
  const { t } = useTranslation();
  const {
    alertOptions, hideAlert, showAlert, isVisible,
  } = useAlert();
  const handleClick = () => {
    console.log('An Astro card');
  };
  return (
    <div className="flex relative">
      <AlertContext.Provider value={showAlert}>
        <h1 className="text-white">{t('components.form.input.error-update')}</h1>
        <h2 className="text-white">ods</h2>
        <AstrosSlider
          astros={[
            { onClick: handleClick, astro: kepler22b },
            { onClick: handleClick, astro: proximaCentauriB },
          ]}
        />
        <Input
          name={t('components.user.login')}
          label="other label"
          defaultValue="xd"
        />
        {
          isVisible && (
            <Alert
              alertOptions={alertOptions}
              hideAlert={hideAlert}
            />
          )
        }
      </AlertContext.Provider>
    </div>
  );
}

render(<App />);
