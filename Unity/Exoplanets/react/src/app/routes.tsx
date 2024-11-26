import CreateConstellation from '@pages/CreateConstellation';
import Exoplanets from '@pages/exoplanets/Exoplanets';
import MainMenu from '@pages/MainMenu';
import Maximized from '@pages/Maximized';
import SeeExoplanet from '@pages/SeeExoplanet';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '@pages/layouts/MainLayout';
import ProfileLayout from '@pages/layouts/ProfileLayout';
import AccountProfile from '@pages/profile/AccountProfile';
import Constellations from '@pages/profile/Constellations';
import { useUserActions } from '@lib/hooks';
import { UserContext } from '@components/user/UserContext';
import About from '@pages/profile/about/About';
import Settings from '@pages/profile/Settings';
import Help from '@pages/profile/Help';
import ContentProfileLayout from '@pages/layouts/ContentProfileLayout';

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
            <Route path="create" element={<CreateConstellation />} />
          </Route>
        </Route>
        <Route path="profile" element={<ProfileLayout />}>
          <Route element={<ContentProfileLayout />}>
            <Route path="account" element={<AccountProfile />} />
            <Route path="options" element={<Settings />} />
            <Route path="about" element={<About />} />
            <Route path="help" element={<Help />} />
          </Route>
          <Route path="constellations" element={<Constellations />} />
        </Route>
        <Route path="max" element={<Maximized />} />
      </Route>
    </Routes>
  );
}
