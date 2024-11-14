import { Locale } from '@i18n/i18next';

export default interface Language {
  abbr: Locale;
  disp: string;
  img: string;
  code: string;
}
