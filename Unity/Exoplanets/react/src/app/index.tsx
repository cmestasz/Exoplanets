import { render } from '@reactunity/renderer';
import './globals.css';
import '@i18n/i18n';
import { useTranslation } from 'react-i18next';
import AstrosSlider from '@components/astros/AstrosSlider';
import { kepler22b, proximaCentauriB } from '@lib/mock';

function App() {
  const { t } = useTranslation();
  const handleClick = () => {
    console.log('An Astro card');
  };
  return (
    <div className="flex">
      <h1 className="text-white">{t('components.form.input.error-update')}</h1>
      <h2 className="text-white">ods</h2>
      <AstrosSlider
        astros={[
          { onClick: handleClick, astro: kepler22b },
          { onClick: handleClick, astro: proximaCentauriB },
        ]}
      />
    </div>
  );
}

render(<App />);
