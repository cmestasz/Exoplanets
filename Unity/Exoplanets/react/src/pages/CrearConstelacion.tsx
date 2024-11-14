import { useNavigate } from 'react-router-dom';

const CrearConstelacion = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Crear Constelación</h1>
      <button onClick={() => navigate(-1)}>Retroceder</button>
      <button onClick={() => navigate('/')}>Volver al Inicio</button>
    </div>
  );
};

export default CrearConstelacion;