import Stars from '@pages/Stars';
import CreateConstellation from '@pages/CreateConstellation';
import Exoplanets from '@pages/Exoplanets';
import MainMenu from '@pages/MainMenu';
import Maximized from '@pages/Maximized';
import MyProfile from '@pages/MyProfile';
import SeeStar from '@pages/SeeStar';
import SeeExoplanet from '@pages/SeeExoplanet';
import { Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <div
      className="w-screen h-screen px-8 py-5 landscape:px-20"
    >
      <Routes>
        <Route path="" element={<MainMenu />} />
        <Route path="exoplanets" element={<Exoplanets />}>
          <Route path=":id" element={<SeeExoplanet />} />
        </Route>
        <Route path="stars" element={<Stars />}>
          <Route path=":id" element={<SeeStar />} />
          <Route path="create" element={<CreateConstellation />} />
        </Route>
        <Route path="profile" element={<MyProfile />} />
        <Route path="max" element={<Maximized />} />
      </Routes>
    </div>
  );
}
