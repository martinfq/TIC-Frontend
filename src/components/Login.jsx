import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate ,  Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL
const COOKIE_EXPIRE = Number(import.meta.env.VITE_COOKIE_EXPRIRE)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const response = await fetch(API_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password:password }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('auth', data.access_token, { expires: COOKIE_EXPIRE }); 
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error(error)
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h1>Please Log In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate ahora</Link></p>
    </div>
  );
};

export default Login;
