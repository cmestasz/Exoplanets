import Input from '@components/form/input/Input';
import { UserContext } from '@components/user/UserContext';
import { supabase } from '@lib/supabase';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

export default function AccountProfile() {
  const { t } = useTranslation();
  const userAction = useContext(UserContext);
  const send = useCallback(async (field: string, value: string) => {
    if (userAction.current.state === 'loaded') {
      const data = await supabase.from('users').update({ [field]: value }).eq('id', userAction.current.data.id);
      if (data.error) {
        console.error(data.error.details.toString());
        throw new Error(`${t('components.form.input.error-update')}${data.error.code}`);
      }
    }
  }, [userAction, t]);
  if (userAction.current.state !== 'loaded') return null;
  return (
    <div
      className="flex flex-col"
    >
      <Input
        name="username"
        label={t('pages.profile.account.username.label')}
        placeholder={t('pages.profile.account.username.placeholder')}
        send={send}
        defaultValue={userAction.current.data.username}
      />
      <Input
        name="first_name"
        label={t('pages.profile.account.name.label')}
        placeholder={t('pages.profile.account.name.placeholder')}
        send={send}
        defaultValue={userAction.current.data.first_name}
      />
      <Input
        name="last_name"
        label={t('pages.profile.account.last-name.label')}
        placeholder={t('pages.profile.account.last-name.placeholder')}
        send={send}
        defaultValue={userAction.current.data.last_name}
      />
      <Input
        name="email"
        label={t('pages.profile.account.email')}
        placeholder={t('pages.profile.account.email')}
        send={send}
        defaultValue={userAction.current.data.email}
        disabled
      />

    </div>
  );
}
