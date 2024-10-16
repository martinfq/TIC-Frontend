import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { format } from 'date-fns';

const API_URL = import.meta.env.VITE_API_URL;

const Historial = () => {
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [historial, setHistorial] = useState([])
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    const token = Cookies.get('auth');
    if (token) {
      setAuthToken(token);
      const emailToken = jwtDecode(token).email;
      setEmail(emailToken);
      fetchHistorial(token);
      fetchUsuario(token)
    }
  }, []);

  const fetchHistorial = async (token) =>{
    try {
        const response = await fetch(API_URL + '/predict/', {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setHistorial(data)
    } catch (error) {
        console.error('Error en el Fetch: ', error)
    }
  };

  const fetchUsuario = async (token) =>{
    try {
        const response = await fetch(API_URL + '/user/', {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setUsuario(data)
    } catch (error) {
        console.error('Error en el Fetch: ', error)
    }
  };

  const handleLogout = () => {
    Cookies.remove('auth');
    window.location.reload();
  };

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navbarLinks}>
          <li>
            <a href="/" className="hover:underline">Home</a>
          </li>
          <li>
            <a href="/Historial" className="hover:underline">Historial</a>
          </li>
        </ul>
        <h3 className={styles.welcomeText}>Bienvenido {email}!</h3>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Salir
        </button>
      </nav>

      <div className={styles.container}>
        <h2 className={styles.formTitle}>Historial de Predicciones</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableRow}>Usuario</th>
                <th className={styles.tableRow}>Resultado</th>
                <th className={styles.tableRow}>Fecha y Hora</th>
              </tr>
            </thead>
            <tbody>
                {historial.length > 0 ? (
                historial.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className={styles.tableRow}>{usuario.name} {usuario.last_name}</td>
                    <td className={styles.tableRow}>{(item.rPrediccion*100).toFixed(2)}%</td>
                    <td className={styles.tableRow}>{format(new Date(item.timestamp), 'dd-MM-yyyy, HH:mm:ss')}</td>
                  </tr>
                ))
                ) : (
                <tr>
                    <td className={styles.tableRow} colSpan="3">No hay datos disponibles</td>
                </tr>
                )}
            </tbody>
          </table>
          <div className={styles.buttonContainer}>
            <a href="/">
              <button className={styles.submitButton}>
                  Agregar Prediccion
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Historial;

const styles = {
    container: 'flex flex-col items-center p-6 bg-gray-100 min-h-screen',
    navbar: 'w-full flex justify-between items-center bg-blue-600 p-4 text-white',
    navbarLinks: 'flex space-x-4',
    welcomeText: 'text-lg',
    logoutButton: 'bg-red-500 hover:bg-red-600 transition duration-200 p-2 rounded',
    tableContainer: 'bg-white p-6 rounded-lg shadow-md w-full max-w-lg',
    formTitle: 'text-2xl font-bold mb-4 text-center',
    table: "min-w-full bg-white border-collapse border border-gray-200 shadow-md",
    tableRow: "border border-gray-300 px-4 py-2",
    submitButton: 'max-w-lg p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200',
    formContainer: 'bg-white p-6 rounded-lg shadow-md w-full max-w-md',
    buttonContainer: 'flex justify-center items-center pt-3'
  };