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
import sha256 from 'crypto-js/sha256';
import { SALT } from 'src/config';

export default function UpdatePhoto() {
  const { t } = useTranslation();
  const userAction = useUser();
  const [selectedPhoto, setSelectedPhoto] = useState<{
    base64: string, mimeType: string,
  } | null>();
  const pictureSelector = useGlobals().PictureSelector as ProfilePictureSelector;
  const showAlert = useContext(AlertContext);
  const {
    open, accept, cancel, content, modalVisible,
  } = useModal({
    title: t('pages.profile.account.avatar.label'),
  });
  const getPhotoData = (mimeType: string, base64: string) => {
    setSelectedPhoto({ mimeType, base64 });
  };
  const uploadImage = async () => {
    if (userAction.current.state === UserStates.LOGGED && selectedPhoto) {
      const identifierImage = `${userAction.current.user.email}--${SALT}`;
      const hash = sha256(identifierImage).toString();

      const { error: storageError, data: { path } } = await supabase.storage
        .from('avatars')
        .upload(`private/image_${hash}.${selectedPhoto.mimeType.split('/')[1]}`, selectedPhoto.base64, {
          contentType: selectedPhoto.mimeType,
          upsert: true,
        });
      if (storageError) {
        showAlert({ message: t('components.form.input.error-update'), type: 'error' });
        console.log('Error  uploading bytes to storage: ', storageError);
        throw storageError;
      }

      const { data: { publicUrl } } = await supabase.storage
        .from('avatars')
        .getPublicUrl(path);

      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar: publicUrl })
        .eq('id', userAction.current.user.id);

      if (updateError) {
        showAlert({ message: t('components.form.input.error-update'), type: 'error' });
        console.log('Error updating avatar: ', updateError);
        throw updateError;
      }

      showAlert({ message: t('components.form.input.success-update') });
      setSelectedPhoto(null);
      const { error: updateUserError } = await userAction.getUser();

      if (updateUserError) {
        console.log('Error updating local user: ', updateUserError);
        throw updateUserError;
      }

      userAction.updateAvatar();
    }
  };
  const onAccept = () => {
    uploadImage()
      .then(() => accept())
      .catch((e) => console.log(e.message));
  };
  const handlePictureSelection = () => {
    pictureSelector.OpenFileBrowser(getPhotoData);
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
                      src={`data:${selectedPhoto.mimeType};base64,${selectedPhoto.base64}`}
                      alt="New selected avatar"
                      className="flex-initial basis-96"
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
