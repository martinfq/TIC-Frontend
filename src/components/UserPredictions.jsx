import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from './Navbar';

const UserPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPredictions = async () => {
      const token = Cookies.get('auth');
      if (!token) {
        setError('No se encontró el token de autenticación.');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5000/usuario', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.ERROR || 'Error al obtener predicciones.');
        }

        const data = await response.json();
        setPredictions(data.Predicciones);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPredictions();
  }, []);

  return (
    <div>
      <Navbar setEmail={() => {}} setAuthToken={() => {}} /> {/* Pasa funciones vacías si no son necesarias */}
      <h1 className="text-2xl font-bold mb-4">Historial de Predicciones</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto px-12 my-5">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Estado de Predicción</th>
              <th className="border border-gray-300 p-2">Probabilidad</th>
              <th className="border border-gray-300 p-2">Fecha de la prediccion</th>
            </tr>
          </thead>
          <tbody>
            {predictions.length > 0 ? (
              predictions.map((prediction, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{prediction.estadoPrediccion}</td>
                  <td className="border border-gray-300 p-2">{prediction.probabilidad * 100}%</td>
                  <td className="border border-gray-300 p-2">{prediction.fecha}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="border border-gray-300 p-2 text-center">
                  No hay predicciones disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPredictions;
