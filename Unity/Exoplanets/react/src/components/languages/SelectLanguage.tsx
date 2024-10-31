import Language from '@mytypes/Language';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '@lib/constants';
import i18n from '@i18n/i18n';
import { Locale } from '@i18n/i18next';
import { Select } from '@reactunity/material';
import OptionLanguage from './OptionLanguage';
import './index.module.scss';

interface SelectLanguageProps {
  showLabel?: boolean;
}

export default function SelectLanguage({
  showLabel,
}: SelectLanguageProps) {
  const { t } = useTranslation();
  const language = Interop.UnityEngine.Application.systemLanguage.toString();
  console.log(language);
  const label = showLabel ? t('components.languages.selectLang') : undefined;
  const defaultLang = AVAILABLE_LANGUAGES
    .find((lang: Language) => lang.disp === language) || DEFAULT_LANGUAGE;
  const updateLanguage = (locale: Locale) => {
    i18n.changeLanguage(locale);
  };
  return (
    <view
      className="flex flex-col gap-1 justify-center w-fit p-3"
    >
      {label && (
        <p className="font-audiowide text-primary text-xl">
          {label}
        </p>
      )}
      <Select
        initialValue={defaultLang.abbr}
        className="font-exo text-secondary"
        onChange={(val: Locale) => updateLanguage(val)}
        variant="outlined"
      >
        {
          AVAILABLE_LANGUAGES.map((lang: Language) => (
            <Select.Option
              key={lang.abbr}
              value={lang.abbr}
            >
              <OptionLanguage
                option={lang}
              />
            </Select.Option>
          ))
        }
      </Select>
    </view>

  );
}
