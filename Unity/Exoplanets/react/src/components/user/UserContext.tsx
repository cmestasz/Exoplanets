import { AsyncData } from '@mytypes/index';
import { UserAPI } from '@mytypes/user';
import { User } from '@supabase/supabase-js';
import { createContext } from 'react';

export const UserContext = createContext<{
  current: AsyncData<UserAPI>,
  fetchUser:(userGetted?: User, withAlert?: boolean) => void,
  logout: (redirectTo?: string) => void,
  login: () => void,
}>(null);
