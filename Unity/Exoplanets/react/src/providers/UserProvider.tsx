import { useUserActions } from '@lib/hooks';
import { createContext, useContext } from 'react';
import { Outlet } from 'react-router';

const UserContext = createContext(null);

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
