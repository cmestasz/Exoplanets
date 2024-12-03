import { useUserActions } from '@lib/hooks';
import { UserManager } from '@mytypes/user';
import { User } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import { Outlet } from 'react-router';

const UserContext = createContext<{
  current: UserManager,
  fetchUser:(userGetted?: User, withAlert?: boolean) => void,
  logout: (redirectTo?: string) => void,
  login: () => void,
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
