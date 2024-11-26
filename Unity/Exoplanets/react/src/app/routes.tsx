import CreateConstellation from '@pages/CreateConstellation';
import Exoplanets from '@pages/exoplanets/Exoplanets';
import MainMenu from '@pages/MainMenu';
import Maximized from '@pages/Maximized';
import SeeExoplanet from '@pages/seeExoplanet/SeeExoplanet';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@pages/layouts/MainLayout';
import ProfileLayout from '@pages/layouts/ProfileLayout';
import AccountProfile from '@pages/profile/AccountProfile';
import Constellations from '@pages/profile/Constellations';
import About from '@pages/profile/about/About';
import Settings from '@pages/profile/Settings';
import Help from '@pages/profile/Help';
import ContentProfileLayout from '@pages/layouts/ContentProfileLayout';
import ExoplanetsProvider from '@pages/exoplanets/ExoplanetsProvider';
import UserProvider from 'src/providers/UserProvider';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<UserProvider />}>
        <Route element={<MainLayout />}>
          <Route path="" element={<MainMenu />} />
          <Route path="exoplanets" element={<ExoplanetsProvider />}>
            <Route path="" element={<Exoplanets />} />
            <Route path=":name" element={<SeeExoplanet />}>
              <Route path="create" element={<CreateConstellation />} />
            </Route>
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
