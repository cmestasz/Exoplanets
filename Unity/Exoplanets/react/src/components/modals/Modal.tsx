import { Text } from '@components/ui/Text';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  title: string;
  onAccept: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

export default function Modal({
  title, onAccept, onCancel, children,
}: ModalProps) {
  const { t } = useTranslation();
  console.log('modal rendered');
  return (
    <portal
      className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
    >
      <article
        className="flex flex-col bg-tertiary rounded-xl py-6 px-12 gap-12"
      >
        <h2 className="font-audiowide text-4xl leading-10 text-primary">{title}</h2>
        {children}
        <view
          className="flex flex-row justify-center gap-5 text-3xl"
        >
          <Text
            asButton
            onClick={onAccept}
            className="hover:text-quaternary border-2 border-primary hover:border-quaternary"
          >
            {t('pages.see-exoplanet.create-const.accept')}
          </Text>
          <Text
            asButton
            onClick={onCancel}
            invertedStyle
            className="hover:text-quaternary"
          >
            {t('pages.see-exoplanet.create-const.cancel')}
          </Text>
        </view>
      </article>
    </portal>
  );
}
