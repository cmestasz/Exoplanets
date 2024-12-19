import { Text } from '@components/ui/Text';
import { ReactUnity } from '@reactunity/renderer';
import React from 'react';
import { useTranslation } from 'react-i18next';

type ModalProps = {
  title: string;
  onAccept: () => void;
  onCancel: () => void;
  disabledButtons?: boolean;
  children?: React.ReactNode;
};
const Modal = React.forwardRef<ReactUnity.UGUI.PortalComponent, ModalProps>(({
  title, onAccept, onCancel, disabledButtons, children,
}: ModalProps, ref) => {
  const { t } = useTranslation();
  console.log('modal rendered');
  return (
    <portal
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80 max-h-screen"
      ref={ref}
    >
      <article
        className="flex flex-col bg-tertiary rounded-xl py-6 px-12 gap-12"
      >
        <h2 className="flex-initial font-audiowide text-4xl leading-10 text-primary">{title}</h2>
        {children}
        <view
          className="flex-initial flex flex-row justify-center gap-5 text-3xl"
        >
          <Text
            asButton
            onClick={onAccept}
            disabled={disabledButtons}
            className="hover:text-quaternary border-2 border-primary hover:border-quaternary"
          >
            {t('pages.see-exoplanet.create-const.accept')}
          </Text>
          <Text
            asButton
            onClick={onCancel}
            disabled={disabledButtons}
            invertedStyle
            className="hover:text-quaternary"
          >
            {t('pages.see-exoplanet.create-const.cancel')}
          </Text>
        </view>
      </article>
    </portal>
  );
});

Modal.displayName = 'Modal';

export default Modal;
