import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      fetchData();
    } else {
      setError("Las contraseñas no coinciden.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL + '/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          last_name: last_name,
          gender: gender,
          birthday: selectedDate,
        }),
      });

      if (response.ok) {
        alert('Registrado correctamente');
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again.');
    }
  };

  // Función para obtener los estilos
  const styles = {
    container: 'flex items-center justify-center min-h-screen bg-gray-100',
    formContainer: 'bg-white p-8 rounded-lg shadow-md w-96',
    title: 'text-2xl font-bold mb-4 text-center',
    error: 'text-red-500 mb-4',
    input: 'w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 mb-4',
    button: 'w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200',
    dateContainer: 'mb-4',
    dateLabel: 'block mb-2',
    selectedDateText: 'mt-2 text-gray-600',
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Regístrate</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
          <div className={styles.dateContainer}>
            <label htmlFor="dateInput" className={styles.dateLabel}>
              Selecciona una fecha:
            </label>
            <input
              type="date"
              id="dateInput"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={styles.input}
            />
            <p className={styles.selectedDateText}>Fecha seleccionada: {selectedDate}</p>
          </div>
          <button type="submit" className={styles.button}>
            Regístrate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
