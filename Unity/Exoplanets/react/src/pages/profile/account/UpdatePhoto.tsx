import { AlertContext } from '@components/modals/AlertContext';
import Modal from '@components/modals/Modal';
import { useModal } from '@lib/hooks';
import { supabase } from '@lib/supabase';
import { UserStates } from '@lib/utils';
import { ProfilePictureSelector } from '@mytypes/UnityTypes';
import { useGlobals } from '@reactunity/renderer';
import { INVERTED_COLOR } from '@styles/colors';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from 'src/providers/UserProvider';
import { twMerge } from 'tailwind-merge';

export default function UpdatePhoto() {
  const { t } = useTranslation();
  const userAction = useUser();
  const [selectedPhoto, setSelectedPhoto] = useState<string>();
  const pictureSelector = useGlobals().PictureSelector as ProfilePictureSelector;
  const showAlert = useContext(AlertContext);
  const {
    open, accept, cancel, content, modalVisible,
  } = useModal({
    title: t('pages.profile.account.avatar.label'),
  });
  const uploadImage = async () => {
    const { error } = await supabase.storage.from('avatars').upload()
  };
  const onAccept = () => {
    if (userAction.current.state === UserStates.LOGGED) {
      supabase.from('users').update({ avatar: selectedPhoto }).eq('id', userAction.current.user.id)
        .then(({ error }) => {
          if (error) {
            showAlert({ message: t('components.form.input.error-update'), type: 'error' });
          } else {
            showAlert({ message: t('components.form.input.success-update') });
            accept();
            setSelectedPhoto('');
            userAction.getUser();
          }
        });
    }
  };
  const handlePictureSelection = () => {
    pictureSelector.OpenFileBrowser(setSelectedPhoto);
  };
  if (userAction.current.state !== UserStates.LOGGED) return null;
  return (
    <button
      className={twMerge('self-center relative flex-grow flex-shrink-0 basis-60 text-secondary hover:text-primary', INVERTED_COLOR)}
      onClick={open}
    >
      <img
        className="flex-auto"
        src={userAction.current.user.avatar}
        alt="User Avatar"
      />
      <icon
        className="absolute bottom-0 -right-14 text-5xl"
      >
        edit
      </icon>
      {
        modalVisible && (
          <Modal
            onAccept={onAccept}
            onCancel={cancel}
            title={content.title}
          >
            <button
              className="flex flex-row flex-initial gap-10 text-secondary hover:text-quaternary group font-exo text-3xl"
              onClick={handlePictureSelection}
            >
              <view
                className={clsx(
                  'flex flex-col border-2 border-secondary group-hover:border-quaternary border-dashed',
                  {
                    'rounded-full': !selectedPhoto,
                  },
                )}
              >
                {
                  selectedPhoto ? (
                    <img
                      src={selectedPhoto}
                      alt="New selected avatar"
                      className="flex-initial basis-3/4"
                    />
                  ) : (
                    <icon className="text-7xl m-20">image</icon>
                  )
                }
              </view>
              <p
                className="shrink flex-grow-0 basis-48 text-left text-balance"
              >
                {
                  selectedPhoto
                    ? t('pages.profile.account.avatar.selected')
                    : t('pages.profile.account.avatar.placeholder')
                }
              </p>
            </button>
          </Modal>
        )
      }
    </button>
  );
}
