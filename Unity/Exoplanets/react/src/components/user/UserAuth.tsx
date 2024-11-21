import { useContext } from 'react';
import UserBox from './UserBox';
import { UserContext } from './UserContext';
import Login from './Login';

export default function UserAuth() {
  const userAction = useContext(UserContext);
  if (userAction.current.state === 'loading') return null;
  if (userAction.current.state === 'error') {
    return (
      <Login />
    );
  }
  return (
    <UserBox />
  );
}
