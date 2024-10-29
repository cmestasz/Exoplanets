import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './messages/en/common.json';
import es from './messages/es/common.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: en,
  },
  es: {
    common: es,
  },
} as const;

i18n
  .use(initReactI18next)
  .init({
    lng: 'es',
    fallbackLng: 'es',
    fallbackNS: defaultNS,
    ns: [defaultNS],
    defaultNS,
    resources,
  // eslint-disable-next-line consistent-return
  }, (err) => {
    if (err) return console.log('something went wrong loading', err);
  });

export default i18n;
