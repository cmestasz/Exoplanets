import { Locale } from '@i18n/i18next';
import Language from '@mytypes/Language';

export const SPANISH: Language = {
  languageAbbr: 'es',
  languageName: 'Español',
};

export const ENGLISH: Language = {
  languageAbbr: 'en',
  languageName: 'English',
};

export const DEFAULT_LANGUAGE: Language = SPANISH;
export const DEFAULT_LOCALE: Locale = 'es';

export const AVAILABLE_LANGUAGES: Language[] = [
  SPANISH, ENGLISH,
];

export const DEFAULT_ALERT_DURATION = 3000;
