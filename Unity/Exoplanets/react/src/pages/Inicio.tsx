import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Página de Inicio</h1>
      <button onClick={() => navigate('/exoplanetas')}>Ir a Exoplanetas</button>
      <button onClick={() => navigate('/estrellas')}>Ir a Estrellas</button>
      <button onClick={() => navigate(-1)}>Retroceder</button>
      <button onClick={() => navigate('/')}>Volver al Inicio</button>
    </div>
  );
};

export default Inicio;
