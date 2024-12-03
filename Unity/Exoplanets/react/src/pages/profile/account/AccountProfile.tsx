import Input from '@components/form/input/Input';
import Scroll from '@components/ui/Scroll';
import { supabase } from '@lib/supabase';
import { UserStates } from '@lib/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from 'src/providers/UserProvider';
import UpdatePhoto from './UpdatePhoto';

export default function AccountProfile() {
  const { t } = useTranslation();
  const userAction = useUser();
  const send = useCallback(async (field: string, value: string) => {
    if (userAction.current.state === UserStates.LOGGED) {
      const data = await supabase.from('users').update({ [field]: value }).eq('id', userAction.current.user.id);
      if (data.error) {
        console.error(data.error.details.toString());
        throw new Error(`${t('components.form.input.error-update')}${data.error.code}`);
      }
      await userAction.getUser();
    }
  }, [userAction, t]);
  if (userAction.current.state !== UserStates.LOGGED) return null;
  return (
    <Scroll
      className="flex flex-col gap-10"
      scrollBarClassName="-right-8"
    >
      <UpdatePhoto />
      <Input
        name="username"
        label={t('pages.profile.account.username.label')}
        placeholder={t('pages.profile.account.username.placeholder')}
        send={send}
        defaultValue={userAction.current.user.username}
      />
      <Input
        name="first_name"
        label={t('pages.profile.account.name.label')}
        placeholder={t('pages.profile.account.name.placeholder')}
        send={send}
        defaultValue={userAction.current.user.first_name}
      />
      <Input
        name="last_name"
        label={t('pages.profile.account.last-name.label')}
        placeholder={t('pages.profile.account.last-name.placeholder')}
        send={send}
        defaultValue={userAction.current.user.last_name}
      />
      <Input
        name="email"
        label={t('pages.profile.account.email')}
        placeholder={t('pages.profile.account.email')}
        send={send}
        defaultValue={userAction.current.user.email}
        disabled
      />

    </Scroll>
  );
}
