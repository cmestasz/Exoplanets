import { useNavigate } from 'react-router-dom';

const Maximizado = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Vista 3D Maximizada</h1>
      <button onClick={() => navigate(-1)}>Retroceder</button>
      <button onClick={() => navigate('/')}>Volver al Inicio</button>
    </div>
  );
};

export default Maximizado;