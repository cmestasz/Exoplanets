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
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/exoplanetas" element={<Exoplanets />} />
      <Route path="/exoplanetas/:id" element={<SeeExoplanet />} />
      <Route path="/estrellas" element={<Stars />} />
      <Route path="/estrellas/:id" element={<SeeStar />} />
      <Route path="/estrellas/crear-constelacion" element={<CreateConstellation />} />
      <Route path="/mi-cuenta" element={<MyProfile />} />
      <Route path="/maximizado" element={<Maximized />} />
    </Routes>
  );
}
