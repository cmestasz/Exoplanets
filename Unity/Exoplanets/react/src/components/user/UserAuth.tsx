import { useUser } from 'src/providers/UserProvider';
import { UserStates } from '@lib/utils';
import UserBox from './UserBox';
import Login from './Login';

export default function UserAuth() {
  const userAction = useUser();
  if (userAction.current.state === UserStates.ANON) {
    return (
      <Login />
    );
  }
  return (
    <UserBox />
  );
}
