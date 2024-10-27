import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import History from './components/History';
import getToken from './utils/getToken';

function App() {
  const [authToken, setAuthToken] = useState(null);
  
  useEffect(() => {
    const {token} =  getToken() || {}
    setAuthToken(token)
  }, []);

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
