import { render } from '@reactunity/renderer';
import './globals.css';
import '@i18n/i18n';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AstrosSlider from '@components/astros/AstrosSlider';
import { kepler22b, proximaCentauriB } from '@lib/mock';
import Input from '@components/form/input/Input';
import { useAlert } from '@lib/hooks';
import Alert, { AlertContext } from '@components/alerts/Alert';
import SelectLanguage from '@components/languages/SelectLanguage';
import { useMemo } from 'react';
import UserAuth from '@components/user/UserAuth';

import Inicio from '@pages/Inicio';
import Exoplanetas from '@pages/Exoplanetas';
import Estrellas from '@pages/Estrellas';
import VerExoplaneta from '@pages/VerExoplaneta';
import VerEstrella from '@pages/VerEstrella';
import CrearConstelacion from '@pages/CrearConstelacion';
import MiCuenta from '@pages/MiCuenta';
import Maximizado from '@pages/Maximizado';

function App() {
  const { t } = useTranslation();
  const {
    alertOptions, hideAlert, showAlert, isVisible,
  } = useAlert();

  const handleClick = () => {
    console.log('An Astro card');
  };

  const astros = useMemo(() => [
    { onClick: handleClick, astro: kepler22b },
    { onClick: handleClick, astro: proximaCentauriB },
  ], []);

  return (
    <BrowserRouter>
      <AlertContext.Provider value={showAlert}>
        <div>
          <h1 className="text-white">{t('components.form.input.error-update')}</h1>
          <SelectLanguage />
          <UserAuth />
          {isVisible && <Alert alertOptions={alertOptions} hideAlert={hideAlert} />}

          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/exoplanetas" element={<Exoplanetas />} />
            <Route path="/exoplanetas/:id" element={<VerExoplaneta />} />
            <Route path="/estrellas" element={<Estrellas />} />
            <Route path="/estrellas/:id" element={<VerEstrella />} />
            <Route path="/estrellas/crear-constelacion" element={<CrearConstelacion />} />
            <Route path="/mi-cuenta" element={<MiCuenta />} />
            <Route path="/maximizado" element={<Maximizado />} />
          </Routes>

          <h2 className="text-white">ods</h2>
          <AstrosSlider astros={astros} />
          <Input
            name={t('components.user.login')}
            label="other label"
            defaultValue="xd"
          />
        </div>
      </AlertContext.Provider>
    </BrowserRouter>
  );
}

render(<App />);
