import { useUserActions } from '@lib/hooks';
import { UserAPI, UserManager } from '@mytypes/user';
import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import { Outlet } from 'react-router';

const UserContext = createContext<{
  current: UserManager,
  getUser:(session?: { token: string, refresh_token: string }, withAlert?: boolean) =>
  Promise<
  { error: AuthError, data?: undefined }
  | { error: PostgrestError, data?: undefined }
  | { error: undefined, data: UserAPI }>,
  logout: (redirectTo?: string) => void,
  login: () => void,
  updateAvatar: () => void,
}>(null);

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider() {
  const userActions = useUserActions();
  return (
    <UserContext.Provider
      value={userActions}
    >
      <Outlet />
    </UserContext.Provider>
  );
}
