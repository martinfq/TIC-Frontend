import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [authToken, setAuthToken] = useState('');
  
  const verifyToken = async () => {
    const token = Cookies.get('auth');
  
    try {
      const response = await fetch(API_URL + '/verify-token', {
        headers: {
          'Authorization': token
        }
      });
      if(response.ok){
        setAuthToken(token)
      }
    } catch (error) {
      
    }
  };
  
  useEffect(() => {
    verifyToken(); // Llamamos a la función cuando el componente se monte
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={authToken ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </Router>
  );
}

export default App;
