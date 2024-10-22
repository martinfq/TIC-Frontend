import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserPredictions from './components/UserPredictions';


function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get('auth');
    if (authToken) {
      setAuth(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/history" element={auth ? <UserPredictions /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
