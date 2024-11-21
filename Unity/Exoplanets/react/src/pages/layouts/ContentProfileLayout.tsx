import { Outlet } from 'react-router';

export default function ContentProfileLayout() {
  return (
    <div className="flex-auto border-2 border-primary rounded-lg p-8">
      <Outlet />
    </div>
  );
}
