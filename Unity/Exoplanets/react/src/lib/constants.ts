import { Locale } from '@i18n/i18next';
import { Language } from '@mytypes/language';

export const SPANISH: Language = {
  abbr: 'es',
  disp: 'Español',
  img: '/img/es.png',
  code: Interop.UnityEngine.SystemLanguage.Spanish.toString(),
};

export const ENGLISH: Language = {
  abbr: 'en',
  disp: 'English',
  img: '/img/en.png',
  code: Interop.UnityEngine.SystemLanguage.English.toString(),
};

export const DEFAULT_LANGUAGE: Language = SPANISH;
export const DEFAULT_LOCALE: Locale = DEFAULT_LANGUAGE.abbr;

export const AVAILABLE_LANGUAGES: Language[] = [
  SPANISH, ENGLISH,
];

export const DEFAULT_ALERT_DURATION = 3000;
