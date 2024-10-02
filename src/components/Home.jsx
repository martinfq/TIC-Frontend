import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [prediction, setPrediction] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth');
    if (token) {
      setAuthToken(token);
      const emailToken = jwtDecode(token).sub.email;
      setEmail(emailToken);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('auth');
    window.location.reload();
  };

  const [formData, setFormData] = useState({
    HighBp: '',
    HighChol: '',
    Smoker: '',
    Stroke: '',
    HeartDiseaseorAttack: '',
    BMI: '',
    PhysActivity: '',
    GenHlth: '',
    MentHlth: '',
    PhysHlth: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      HighBp: parseFloat(formData.HighBp === 'true' ? '1.0' : '0.0'),
      HighChol: parseFloat(formData.HighChol === 'true' ? '1.0' : '0.0'),
      Smoker: parseFloat(formData.Smoker === 'true' ? '1.0' : '0.0'),
      Stroke: parseFloat(formData.Stroke === 'true' ? '1.0' : '0.0'),
      HeartDiseaseorAttack: parseFloat(formData.HeartDiseaseorAttack === 'true' ? '1.0' : '0.0'),
      BMI: parseFloat(formData.BMI),
      PhysActivity: parseFloat(formData.PhysActivity),
      GenHlth: parseFloat(formData.GenHlth),
      MentHlth: parseFloat(formData.MentHlth),
      PhysHlth: parseFloat(formData.PhysHlth),
    };
    const response = await fetch(API_URL + '/predict/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(formattedData),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.prediction === 1.0) {
        setPrediction(true);
      }
      alert('Creada correctamente');
    } else {
      alert('Error submitting data');
    }
  };


  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navbarLinks}>
          <li>
            <a href="/" className="hover:underline">Home</a>
          </li>
          <li>
            <a href="/about" className="hover:underline">About</a>
          </li>
        </ul>
        <h3 className={styles.welcomeText}>Bienvenido {email}!</h3>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Salir
        </button>
      </nav>
      <div className={styles.container}>
        <p className={styles.predictionText}>
          {prediction ? 'Tiene diabetes' : 'No tiene diabetes'}
        </p>
        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Crea una predicción</h1>
          <form onSubmit={handleSubmit}>
            {['HighBp', 'HighChol', 'Smoker', 'Stroke', 'HeartDiseaseorAttack'].map((field) => (
              <div key={field}>
                <label className={styles.inputLabel}>
                  {field.replace(/([A-Z])/g, ' $1').trim()}:
                </label>
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={styles.inputSelect}
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            ))}
            {['BMI', 'PhysActivity', 'GenHlth', 'MentHlth', 'PhysHlth'].map((field) => (
              <div key={field}>
                <label className={styles.inputLabel}>
                  {field.replace(/([A-Z])/g, ' $1').trim()}:
                </label>
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>
            ))}
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;

  const styles = {
    container: 'flex flex-col items-center p-6 bg-gray-100 min-h-screen',
    navbar: 'w-full flex justify-between items-center bg-blue-600 p-4 text-white',
    navbarLinks: 'flex space-x-4',
    welcomeText: 'text-lg',
    logoutButton: 'bg-red-500 hover:bg-red-600 transition duration-200 p-2 rounded',
    predictionText: 'mt-4 text-xl',
    formContainer: 'bg-white p-6 rounded-lg shadow-md w-full max-w-md',
    formTitle: 'text-2xl font-bold mb-4 text-center',
    inputLabel: 'block mb-2 font-medium',
    inputSelect: 'w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300',
    inputField: 'w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300',
    submitButton: 'w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200',
  };