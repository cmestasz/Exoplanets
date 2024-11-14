import { useNavigate, useParams } from 'react-router-dom';

export default function SeeStar() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>
        Estrella
        {id}
      </h1>
      <button onClick={() => navigate('max')}>Ver en 3D</button>
      <button onClick={() => navigate('stars/create')}>Crear Constelación</button>
      <button onClick={() => navigate(-1)}>Retroceder</button>
      <button onClick={() => navigate('')}>Volver al Inicio</button>
    </div>
  );
}
