import Input from '@components/form/input/Input';
import { UserContext } from '@components/user/UserContext';
import { supabase } from '@lib/supabase';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

export default function AccountProfile() {
  const { t } = useTranslation();
  const userAction = useContext(UserContext);
  const sendName = useCallback(async (name: string) => {
    const { error } = await supabase.from('users').update({ first_name: name }).eq('id', userAction.current.state === 'loaded' && userAction.current.data.id);
    if (error) {
      throw new Error(`${t('components.form.input.error-update')}${error.code}`);
    }
  }, [userAction, t]);
  if (userAction.current.state !== 'loaded') return null;
  return (
    <div
      className="flex flex-col"
    >
      <Input name="username" label={t('pages.profile.account.username.label')} placeholder={t('pages.profile.account.username.placeholder')} send={sendName} defaultValue={userAction.current.data.first_name} />
    </div>
  );
}
