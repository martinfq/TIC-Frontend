import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import NavBar from './main/NavBar';
import PredictionForm from './main/PredictionForm';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [prediction, setPrediction] = useState(false);
  const [data, setData] = useState(null);
  const [preditc, setPredict] = useState(null);

  useEffect(() => {
    const token = Cookies.get('auth');

    const fetchData = async (emailToken) => {
      try {
        const response = await fetch(API_URL + `/user/?email=${emailToken}`); // Reemplaza con la URL de tu API
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchPredict = async (emailToken) => {
      try {
        const response = await fetch(API_URL + `/predict/?email=${emailToken}`); // Reemplaza con la URL de tu API
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json();
        setPredict(result);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) {
      setAuthToken(token);
      const emailToken = jwtDecode(token).sub;
      setEmail(emailToken);
      fetchData(emailToken); // Llamar fetchData después de que se obtenga emailToken
      fetchPredict(emailToken); // Llamar fetchData después de que se obtenga emailToken
    }
  }, []);

  return (
    <>
      <NavBar/>
      <div className={`${styles.container} grid grid-cols-1 md:grid-cols-2 gap-4`}>
        <div className={styles.formContainer}>
          <PredictionForm />
        </div>
        <div className="md:pl-4">
          <h1>Datos del servidor</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <h1>Datos del servidor 2</h1>
          <pre>{JSON.stringify(preditc, null, 2)}</pre>
        </div>
      </div>

    </>
  );
};

export default Home;

const styles = {
  container: 'flex flex-col items-center p-6 bg-gray-100 min-h-screen',
  welcomeText: 'text-lg',
  logoutButton: 'bg-red-500 hover:bg-red-600 transition duration-200 p-2 rounded',
  predictionText: 'mt-4 text-xl',
  formContainer: 'bg-white p-6 rounded-lg shadow-md w-full max-w-md',
};