import { useNavigate } from 'react-router-dom';

export default function Exoplanets() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Lista de Exoplanetas</h1>
      <button onClick={() => navigate(-1)}>Retroceder</button>
      <button onClick={() => navigate('')}>Volver al Inicio</button>

    </div>
  );
}
