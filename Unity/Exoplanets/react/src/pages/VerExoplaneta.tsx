import { useNavigate, useParams } from 'react-router-dom';

const VerExoplaneta = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Exoplaneta {id}</h1>
      <button onClick={() => navigate('/maximizado')}>Ver en 3D</button>
      <button onClick={() => navigate(-1)}>Retroceder</button>
      <button onClick={() => navigate('/')}>Volver al Inicio</button>
    </div>
  );
};

export default VerExoplaneta;