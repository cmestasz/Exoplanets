import 'i18next';
import { defaultNS, resources } from './i18n';

export type Locale = 'es' | 'en';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources['es'];
    fallbackNS: typeof defaultNS;
    lng: Locale;
    fallbackLng: Locale;
  }
}
