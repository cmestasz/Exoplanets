import { useUser } from 'src/providers/UserProvider';
import UserBox from './UserBox';
import Login from './Login';

export default function UserAuth() {
  const userAction = useUser();
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
