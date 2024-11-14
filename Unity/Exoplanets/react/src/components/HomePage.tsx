import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>holaxd</h1>
      <Link to="/exoplanetas">Ir a Exoplanetas</Link>
      <Link to="/estrellas">Ir a Estrellas</Link>
    </div>
  );
}

export default HomePage;
