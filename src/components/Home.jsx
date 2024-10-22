import { useEffect, useState } from 'react';
import FormPrediction from './PredictionForm/FormPrediction';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [prediction, setPrediction] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth');
    if (token) {
      setAuthToken(token);
      const emailToken = jwtDecode(token).email;
      setEmail(emailToken);
    } else {
      console.error('No auth token found.');
    }
  }, []);

  return (
    <>
      <Navbar setEmail={setEmail} setAuthToken={setAuthToken} />
      <div className="flex flex-col md:flex-row p-10 bg-gray-100 min-h-screen">
        <div className="md:flex-1 bg-white p-6 rounded-lg shadow-md md:mx-2 mb-5">
          <h1 className="text-2xl font-bold mb-4 text-center">Crea una predicción</h1>
          <FormPrediction authToken={authToken} setPrediction={setPrediction} />
        </div>
        <div className="md:flex-1 bg-gray-200 p-6 rounded-lg md:mx-2 mb-5">
          <div className="flex flex-col space-y-4">
            <div
              className="flex justify-between bg-white p-4 rounded-lg shadow-md"
              style={{ height: '150px', display: 'flex', alignItems: 'center' }}
            >
              <div className="text-center">
                <h3 className="font-bold">Género</h3>
              </div>
              <div className="text-center">
                <h3 className="font-bold">Edad</h3>
              </div>
              <div className="text-center">
                <h3 className="font-bold">Foto</h3>
              </div>
            </div>

            <div
              className="bg-white p-4 rounded-lg shadow-md"
              style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <h3 className="font-bold text-center">Porcentaje de padecimiento</h3>
            </div>

            <div
              className="bg-white p-4 rounded-lg shadow-md"
              style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <h3 className="font-bold text-center">No</h3>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                style={{ width: '50%' }}
                onClick={() => window.location.href = '/history'}
              >
                Registro de predicciones
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
