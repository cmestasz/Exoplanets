import Input from '@components/form/input/Input';
import { UserContext } from '@components/user/UserContext';
import { supabase } from '@lib/supabase';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

export default function AccountProfile() {
  const { t } = useTranslation();
  const userAction = useContext(UserContext);
  const sendName = useCallback(async (name: string) => {
    if (userAction.current.state === 'loaded') {
      const data = await supabase.from('users').update({ first_name: name });
      //   .eq('id', userAction.current.data.id);
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
      <Input name="username" label={t('pages.profile.account.username.label')} placeholder={t('pages.profile.account.username.placeholder')} send={sendName} defaultValue={userAction.current.data.first_name} />
    </div>
  );
}
