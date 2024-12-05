import { AlertContext } from '@components/modals/AlertContext';
import Modal from '@components/modals/Modal';
import { useModal } from '@lib/hooks';
import { supabase } from '@lib/supabase';
import { UserStates } from '@lib/utils';
import { ProfilePictureSelector } from '@mytypes/UnityTypes';
import { useGlobals } from '@reactunity/renderer';
import { INVERTED_COLOR } from '@styles/colors';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from 'src/providers/UserProvider';
import { twMerge } from 'tailwind-merge';
import sha256 from 'crypto-js/sha256';
import { SALT } from 'src/config';
import Spin from '@components/loading/Spin';

const UpdateStates = {
  NORMAL: 'normal',
  SEARCHING: 'searching',
  UPDATING: 'updating',
};

type UpdateState = typeof UpdateStates[keyof typeof UpdateStates];

export default function UpdatePhoto() {
  const { t } = useTranslation();
  const userAction = useUser();
  const [updateState, setUpdateState] = useState<UpdateState>(UpdateStates.NORMAL);
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
    if (mimeType && base64) {
      setSelectedPhoto({ mimeType, base64 });
    } else {
      setSelectedPhoto(undefined);
    }
    setUpdateState(UpdateStates.NORMAL);
  };
  const uploadImage = async () => {
    if (userAction.current.state === UserStates.LOGGED && selectedPhoto) {
      setUpdateState(UpdateStates.UPDATING);
      const identifierImage = `${userAction.current.user.email}--${SALT}`;
      const hash = sha256(identifierImage).toString();

      const { error: storageError, data: { path } } = await supabase.storage
        .from('avatars')
        .upload(`private/image_${hash}.${selectedPhoto.mimeType.split('/')[1]}`, selectedPhoto.base64, {
          contentType: selectedPhoto.mimeType,
          upsert: true,
        });
      if (storageError) {
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
        console.log('Error updating avatar: ', updateError);
        throw updateError;
      }

      showAlert({ message: t('components.form.input.success-update') });
      accept();
      setSelectedPhoto(null);
      userAction.updateAvatar();
    }
  };
  const onAccept = () => {
    uploadImage()
      .catch(() => {
        showAlert({ message: t('components.form.input.error-update'), type: 'error' });
        setUpdateState(UpdateStates.NORMAL);
      });
  };
  const onCancel = () => {
    cancel();
    setUpdateState(UpdateStates.NORMAL);
  };
  const handlePictureSelection = () => {
    pictureSelector.OpenFileBrowser(getPhotoData);
    setUpdateState(UpdateStates.SEARCHING);
  };
  useEffect(() => {
    if (updateState === UpdateStates.UPDATING) {
      setUpdateState(UpdateStates.NORMAL);
    }
  }, [userAction.current]);

  if (userAction.current.state !== UserStates.LOGGED) return null;
  return (
    <button
      className={twMerge('self-center relative flex-grow flex-shrink-0 basis-60 text-secondary hover:text-primary', INVERTED_COLOR)}
      onClick={open}
      disabled={updateState === UpdateStates.UPDATING}
    >
      {
        updateState !== UpdateStates.UPDATING ? (
          <>
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
          </>
        ) : (
          <Spin />
        )
      }
      {
        modalVisible && (
          <Modal
            onAccept={onAccept}
            onCancel={onCancel}
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
                  !selectedPhoto && updateState === UpdateStates.NORMAL && (
                    <icon className="text-7xl m-20">image</icon>
                  )
                }
                {
                  selectedPhoto && updateState !== UpdateStates.SEARCHING && (
                    <img
                      src={`data:${selectedPhoto.mimeType};base64,${selectedPhoto.base64}`}
                      alt="New selected avatar"
                      className="flex-initial basis-96"
                    />
                  )
                }
              </view>
              <p
                className="shrink flex-grow-0 basis-48 text-left text-balance"
              >
                {
                  !selectedPhoto && updateState === UpdateStates.NORMAL && t('pages.profile.account.avatar.placeholder')
                }
                {
                  selectedPhoto && updateState === UpdateStates.NORMAL && t('pages.profile.account.avatar.selected')
                }
                {
                  selectedPhoto && updateState === UpdateStates.UPDATING && t('components.form.input.sending')
                }
              </p>
            </button>
          </Modal>
        )
      }
    </button>
  );
}
