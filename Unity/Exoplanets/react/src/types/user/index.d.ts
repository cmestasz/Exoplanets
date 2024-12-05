import { UserStates } from '@lib/utils';

interface UserAPI {
  avatar: string | null
  created_at: string
  email: string
  first_name: string | null
  id: string
  last_name: string | null
  username: string | null
}

type UserState = typeof UserStates[keyof typeof UserStates];

type UserManager = {
  state: typeof UserStates.ANON | typeof UserStates.UPDATING;
  user?: undefined;
} | {
  state: typeof UserStates.LOGGED | typeof UserStates.UPDATING;
  user: UserAPI;
};

export { UserAPI, UserState, UserManager };
