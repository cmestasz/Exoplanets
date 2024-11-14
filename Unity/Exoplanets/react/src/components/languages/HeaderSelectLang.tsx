import Text from '@components/ui/Text';
import Language from '@mytypes/Language';
import clsx from 'clsx';

interface HeaderSelectLangProps {
  lang: Language;
  opened: boolean;
  onClick: () => void;
}

export default function HeaderSelectLang({
  lang, onClick, opened,
}: HeaderSelectLangProps) {
  return (
    <Text
      asButton
      invertedStyle
      onClick={onClick}
      className={clsx({
        'hover:text-primary text-primary': opened,
      })}
      size="lg"
    >
      <image
        src={lang.img}
      />
      <span>{lang.disp}</span>
      <icon>keyboard_arrow_down</icon>
    </Text>
  );
}
