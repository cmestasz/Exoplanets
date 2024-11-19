import Input from '@components/form/input/Input';
import { UserContext } from '@components/user/UserContext';
import { supabase } from '@lib/supabase';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

export default function AccountProfile() {
  const { t } = useTranslation();
  const userAction = useContext(UserContext);
  if (userAction.current === 'loading' || userAction.current === 'error') return null;
  const sendName = useCallback(async (name: string) => {
    const { error } = await supabase.from('users').update({ first_name: name }).eq('id', userAction.current);
    if (error) {
      console.log(error);
      throw new Error(`${t('components.form.input.error-update')}${error.code}`);
    }
  }, [userAction]);
  return (
    <div
      className="flex flex-col"
    >
      <Input name="username" label={t('pages.profile.account.username.label')} placeholder={t('pages.profile.account.username.placeholder')} send={sendName} defaultValue={userAction.current.first_name} />
    </div>
  );
}
