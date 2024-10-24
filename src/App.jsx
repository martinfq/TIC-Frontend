import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import History from './components/History';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  const fetchToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setAuthToken(token);  // Token válido
      } else {
        Cookies.remove('auth');
        setAuthToken(null);  // Si el token no es válido, asegúrate de que se limpie el estado
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    } finally {
      setLoading(false);  // Termina la carga después de verificar
    }
  };
  useEffect(() => {
    const token = Cookies.get('auth');
    if (!token) {
      setLoading(false);  
      return;
    }
    setAuthToken(token)
    //fetchToken(token); //Si se quiere verificar el token y si expiro o no
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Muestra un indicador de carga mientras se verifica el token
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={authToken ? <Home/> : <Login />} 
        />
        <Route path="/register" element={<Register />} /> 
        <Route path="/historial" element={<History />} /> 
      </Routes>
    </Router>
  );
}

export default App;
