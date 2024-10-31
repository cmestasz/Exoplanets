import { Locale } from '@i18n/i18next';
import Language from '@mytypes/Language';

export const SPANISH: Language = {
  abbr: 'es',
  disp: 'Español',
  img: '/img/es.png',
};

export const ENGLISH: Language = {
  abbr: 'en',
  disp: 'English',
  img: '/img/en.png',
};

export const DEFAULT_LANGUAGE: Language = SPANISH;
export const DEFAULT_LOCALE: Locale = 'es';

export const AVAILABLE_LANGUAGES: Language[] = [
  SPANISH, ENGLISH,
];

export const DEFAULT_ALERT_DURATION = 3000;
