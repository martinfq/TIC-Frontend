import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import History from './components/History';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [authToken, setAuthToken] = useState('');
  
  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAuthToken(token);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };
  
  useEffect(() => {
    const token = Cookies.get('auth');
    if (token) {
      verifyToken(token);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={authToken ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/historial" element={<History />} /> 
      </Routes>
    </Router>
  );
}

export default App;
