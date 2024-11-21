import Language from '@mytypes/Language';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '@lib/constants';
import i18n from '@i18n/i18n';
import { useCallback, useEffect, useState } from 'react';
import { Text } from '@components/ui/Text';
import { twMerge } from 'tailwind-merge';
import HeaderSelectLang from './HeaderSelectLang';

interface SelectLanguageProps {
  showLabel?: boolean;
  className?: string;
}

export default function SelectLanguage({
  showLabel, className,
}: SelectLanguageProps) {
  const { t } = useTranslation();
  const [opened, setOpened] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<Language>(DEFAULT_LANGUAGE);
  const label = showLabel ? t('components.languages.selectLang') : undefined;
  const handleLanguage = useCallback((lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang.code);
    i18n.changeLanguage(lang.abbr);
    setOpened(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);
  useEffect(() => {
    const cacheCodeLang = localStorage.getItem('language');
    let customLang;
    if (!cacheCodeLang) {
      const language = Interop.UnityEngine.Application.systemLanguage;
      customLang = AVAILABLE_LANGUAGES
        .find((lang: Language) => lang.code === language.toString()) || DEFAULT_LANGUAGE;
    } else {
      customLang = AVAILABLE_LANGUAGES
        .find((lang: Language) => lang.code === cacheCodeLang);
    }
    handleLanguage(customLang);
  }, [handleLanguage]);
  return (
    <view
      className={twMerge('flex flex-col gap-1', className)}
    >
      {label && (
        <p className="font-audiowide text-primary w-full text-xl">
          {label}
        </p>
      )}
      <view className="relative w-full flex-grow-0">
        <HeaderSelectLang
          lang={currentLang}
          opened={opened}
          onClick={() => setOpened((p) => !p)}
        />
        {
          opened && (
            <view
              className="flex flex-col items-start gap-2 p-2 enter:opacity-0 enter:-trans-y-10 enter:state-duration-0 state-duration-500 transition-all duration-500 m-duration-500 leave:-trans-y-10 leave:opacity-0 absolute top-[105%] left-0 bg-tertiary w-full rounded-xl z-[1000] text-3xl"
            >
              {
                AVAILABLE_LANGUAGES.map((lang: Language) => (
                  <Text
                    key={lang.abbr}
                    asButton
                    invertedStyle
                    disabled={lang.abbr === currentLang.abbr}
                    onClick={() => handleLanguage(lang)}
                    className="w-full justify-start max-h-20 py-4 gap-5"
                  >
                    <img
                      src={lang.img}
                      alt={lang.disp}
                    />
                    <span>
                      {lang.disp}
                    </span>
                  </Text>
                ))
              }
            </view>
          )
        }
      </view>
    </view>
  );
}
