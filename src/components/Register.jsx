import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:5000';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');

  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;
    setEmailError('');
    setNameError('');
    setLastNameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setDateError('');
    setGenderError('');

    const nameRegex = /^[A-Za-z]+$/;

    if (email.trim() === '') {
      setEmailError('Correo electrónico requerido.');
      isValid = false;
    }

    if (name.trim() === '') {
      setNameError('Nombre requerido.');
      isValid = false;
    } else if (!nameRegex.test(name)) {
      setNameError('El nombre solo debe contener letras');
      isValid = false;
    }

    if (last_name.trim() === '') {
      setLastNameError('Apellido requerido.');
      isValid = false;
    } else if (!nameRegex.test(last_name)) {
      setLastNameError('El apellido solo debe contener letras');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Contraseña requerida.');
      isValid = false;
    }

    if (confirmPassword.trim() === '' || password !== confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden.');
      isValid = false;
    }

    const today = new Date();
    const selected = new Date(selectedDate);
    if (!selectedDate) {
      setDateError('Fecha de nacimiento requerida.');
      isValid = false;
    } else if (selected > today) {
      setDateError('La fecha no puede ser posterior a hoy.');
      isValid = false;
    }

    if (gender === '') {
      setGenderError('Selección de género requerida');
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
    fetchData();
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
          birthday: selectedDate,
          genero: gender, 
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

  const styles = {
    container: 'flex flex-col md:flex-row items-center justify-center min-h-screen relative',
    background: 'absolute inset-0 bg-[url(./med.png)] bg-cover bg-center bg-no-repeat md:hidden z-0',
    imageContainer: 'hidden md:flex md:w-[46%] h-auto justify-center items-center z-10',
    formContainer: 'sm:w-4/5 md:w-[40%] bg-white p-8 rounded-lg mx-auto mt-8 md:mt-0 z-10 shadow-lg',
    title: 'text-2xl font-bold mb-4 text-center',
    errorText: 'text-red-500 mb-4',
    input: 'w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300',
    inputError: 'text-red-500 text-sm mt-1 mb-4',
    button: 'w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 mt-4',
    dateContainer: 'mb-4',
    dateLabel: 'block mb-2',
    loginLink: 'text-blue-500 hover:underline',
    selectedDateText: 'mt-2 text-gray-600',
    nameContainer: 'flex justify-between',
    nameInput: 'w-1/2 mr-2',
    lastNameInput: 'w-1/2 ml-2',
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.imageContainer}>
        <img
          src="./med.png"
          alt="Register Image"
          className="h-auto max-h-[700px]"
        />
      </div>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Regístrate</h1>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Correo Electrónico
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              className={`${styles.input} ${emailError ? '' : 'mb-4'}`} 
            />
            {emailError && <p className={styles.inputError}>{emailError}</p>}
          </label>
          <div className={styles.nameContainer}>
            <label className={styles.nameInput}>
              Nombre
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError('');
                }}
                className={`${styles.input} ${nameError ? '' : 'mb-4'}`} 
              />
              {nameError && <p className={styles.inputError}>{nameError}</p>}
            </label>
            <label className={styles.lastNameInput}>
              Apellido
              <input
                type="text"
                placeholder="Apellido"
                value={last_name}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setLastNameError('');
                }}
                className={`${styles.input} ${lastNameError ? '' : 'mb-4'}`} 
              />
              {lastNameError && <p className={styles.inputError}>{lastNameError}</p>}
            </label>
          </div>
          <label>
            Contraseña
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              className={`${styles.input} ${passwordError ? '' : 'mb-4'}`} 
            />
            {passwordError && <p className={styles.inputError}>{passwordError}</p>}
          </label>
          <label>
            Confirmar Contraseña
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError('');
              }}
              className={`${styles.input} ${confirmPasswordError ? '' : 'mb-4'}`} 
            />
            {confirmPasswordError && <p className={styles.inputError}>{confirmPasswordError}</p>}
          </label>
          <label> Género
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setGenderError('');
              }}
              className={`${styles.input} ${genderError ? '' : 'mb-4'}`} 
            >
              <option value="">Selecciona tu género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            {genderError && <p className={styles.inputError}>{genderError}</p>}
          </label>
          <div className={styles.dateContainer}>
            <label htmlFor="dateInput" className={styles.dateLabel}>
              Fecha de nacimiento:
            </label>
            <input
              type="date"
              id="dateInput"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={styles.input}
            />
            {dateError && <p className={styles.inputError}>{dateError}</p>}
          </div>
          <button type="submit" className={styles.button}>Registrarse</button>
        </form>
        <p className="mt-4 text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/" className={styles.loginLink}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
