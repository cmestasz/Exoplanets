import { useNavigate } from 'react-router-dom';

export default function AccountProfile() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col flex-auto border-2 border-primary rounded-lg"
    >
      <h1>Mi Cuenta</h1>
      <button onClick={() => navigate(-1)}>Retroceder</button>
      <button onClick={() => navigate('')}>Volver al Inicio</button>
    </div>
  );
}
