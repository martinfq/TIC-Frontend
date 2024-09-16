import React from 'react';
import Cookies from 'js-cookie';

const Home = () => {
  const handleLogout = () => {
    Cookies.remove('auth'); 
    window.location.reload(); 
  };

  return (
    <div>
      <h1>Welcome Home!</h1>
      <p>Estás autenticado.</p>
      <button onClick={handleLogout}>Salir</button>
    </div>
  );
};

export default Home;
