import { AsyncData } from '@mytypes/AsyncData';
import UserAPI from '@mytypes/User';
import { User } from '@supabase/supabase-js';
import { createContext } from 'react';

export const UserContext = createContext<{
  current: AsyncData<UserAPI>,
  fetchUser:(userGetted?: User, withAlert?: boolean) => void,
  logout: (redirectTo: string) => void
}>(null);
