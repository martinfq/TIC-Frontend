import { useState } from 'react';
import Cookies from 'js-cookie';
import {Link } from 'react-router-dom';

//const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'http://127.0.0.1:5000'
//const COOKIE_EXPIRE = Number(import.meta.env.VITE_COOKIE_EXPRIRE);
const COOKIE_EXPIRE = Number(60);

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
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('auth', data.access_token, { expires: 1/1440 });
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again.');
    }
  };

  

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Please Log In</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>
        <p className={styles.registerText}>
          ¿No tienes cuenta? <Link to="/register" className={styles.registerLink}>Regístrate ahora</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


const styles = {
  container: 'flex items-center justify-center min-h-screen bg-gray-100',
  formContainer: 'bg-white p-8 rounded-lg shadow-md w-96',
  title: 'text-2xl font-bold mb-4 text-center',
  error: 'text-red-500 mb-4',
  input: 'w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 mb-4',
  button: 'w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200',
  registerText: 'mt-4 text-center',
  registerLink: 'text-blue-500 hover:underline',
};