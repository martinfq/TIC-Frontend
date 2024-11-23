import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;
const COOKIE_EXPIRE = Number(60);

const styles = {
  container: 'flex flex-col md:flex-row items-center justify-center min-h-screen relative',
  background: 'absolute inset-0 bg-[url(./med.png)] bg-cover bg-center bg-no-repeat md:hidden z-0',
  imageContainer: 'hidden md:flex md:w-[46%] h-auto justify-center items-center z-10',
  loginContainer: 'sm:w-4/5 md:w-[40%] bg-white p-8 rounded-lg mx-auto mt-8 md:mt-0 z-10 shadow-lg',
  title: 'text-2xl font-bold mb-4 text-center',
  errorText: 'text-red-500 mb-4',
  input: 'w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300',
  button: 'w-full p-2 bg-primary text-white rounded hover:bg-primary_hover transition duration-200 mt-4',
  registerLink: 'text-blue-500 hover:underline',
  togglePassword: 'absolute right-3 top-3 cursor-pointer',
  inputError: 'text-red-500 text-sm mt-1 mb-4',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateFields = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (email.trim() === '') {
      setEmailError('El correo electrónico es requerido.');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('La contraseña es requerida.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateFields()) {
      return;
    }

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
        Cookies.set('auth', data.access_token, { expires: 60 / 1440 });
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Correo o contraseña incorrectas. Trate de nuevo');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.imageContainer}>
        <img
          src="./med.png"
          alt="Login Image"
          className="h-auto max-h-[700px]"
        />
      </div>

      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Bienvenido a "nombre de la aplicacion"</h1>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Correo electrónico
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              className={`${styles.input} ${emailError ? '' : 'mb-4'}`} 
            />
            {emailError && <p className={styles.inputError}>{emailError}</p>}
          </label>
          <label>
            Contraseña
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                className={`${styles.input} ${passwordError ? '' : 'mb-4'}`}
              />
              <span
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C6.75 3 2.25 9 2.25 9s4.5 6 9.75 6 9.75-6 9.75-6-4.5-6-9.75-6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75c-1.25 0-2.25 1-2.25 2.25s1 2.25 2.25 2.25 2.25-1 2.25-2.25-1-2.25-2.25-2.25z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C6.75 3 2.25 9 2.25 9s4.5 6 9.75 6 9.75-6 9.75-6-4.5-6-9.75-6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75c-1.25 0-2.25 1-2.25 2.25s1 2.25 2.25 2.25 2.25-1 2.25-2.25-1-2.25-2.25-2.25z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l9 9M3 3l18 18" />
                  </svg>
                )}
              </span>
            </div>
            {passwordError && <p className={styles.inputError}>{passwordError}</p>}
          </label>
          <button type="submit" className={styles.button}>
            Ingresar
          </button>
        </form>
        <p className={`mt-4 text-center`}>
          ¿No tienes cuenta? <Link to="/register" className={styles.registerLink}>Regístrate ahora</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
