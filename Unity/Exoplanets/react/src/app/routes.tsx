import Stars from '@pages/Stars';
import CreateConstellation from '@pages/CreateConstellation';
import Exoplanets from '@pages/Exoplanets';
import MainMenu from '@pages/MainMenu';
import Maximized from '@pages/Maximized';
import SeeStar from '@pages/SeeStar';
import SeeExoplanet from '@pages/SeeExoplanet';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '@pages/layouts/MainLayout';
import ProfileLayout from '@pages/layouts/ProfileLayout';
import AccountProfile from '@pages/profile/AccountProfile';
import Constellations from '@pages/profile/Constellations';
import { useUserActions } from '@lib/hooks';
import { UserContext } from '@components/user/UserContext';

function UserProvider() {
  const userActions = useUserActions();
  return (
    <UserContext.Provider
      value={userActions}
    >
      <Outlet />
    </UserContext.Provider>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<UserProvider />}>
        <Route element={<MainLayout />}>
          <Route path="" element={<MainMenu />} />
          <Route path="exoplanets" element={<Exoplanets />}>
            <Route path=":id" element={<SeeExoplanet />} />
          </Route>
          <Route path="stars" element={<Stars />}>
            <Route path=":id" element={<SeeStar />} />
            <Route path="create" element={<CreateConstellation />} />
          </Route>
        </Route>
        <Route path="profile" element={<ProfileLayout />}>
          <Route path="account" element={<AccountProfile />} />
          <Route path="constellations" element={<Constellations />} />
          <Route path="options" element={<AccountProfile />} />
          <Route path="about" element={<AccountProfile />} />
          <Route path="help" element={<AccountProfile />} />
        </Route>
        <Route path="max" element={<Maximized />} />
      </Route>
    </Routes>
  );
}
