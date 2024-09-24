import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL
const Home = () => {
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState('')
  const [prediction, setPrediction] = useState(false)

  useEffect(() => {
    //debo verificar que el token no este vencido o utilizar 
    const token = Cookies.get('auth');
    setAuthToken(token);
    const emailToken = jwtDecode(token).sub.email
    setEmail(emailToken)
  }, []);

  const handleLogout = () => {
    Cookies.remove('auth');
    window.location.reload();
  };

  //
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

    }
    const response = await fetch(API_URL + '/predict/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(formattedData),
    });

    if (response.ok) {
      const data = await response.json()
      if(data.prediction === 1.0){
        setPrediction(true)
      }
      alert("Creada correctamente")
    } else {
      alert('Error submitting data');
      // Manejar errores
    }
  };
  //
  return (
    <>
      <nav className="navbar">
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <h3>Bienvenido {email}!</h3>
        <button onClick={handleLogout}>Salir</button>
      </nav>
      <div>
        {prediction ? <p>Tiene diabetes</p>: <p>No tiene diabtes</p> }
      </div>
      <div>
        <h1>Crea una prediccion</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>High Blood Pressure (HighBp):</label>
            <select name="HighBp" value={formData.HighBp} onChange={handleChange}>
              <option value="">Select</option>
              <option value='true'>Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label>High Cholesterol (HighChol):</label>
            <select name="HighChol" value={formData.HighChol} onChange={handleChange}>
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label>Smoker:</label>
            <select name="Smoker" value={formData.Smoker} onChange={handleChange}>
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label>Stroke:</label>
            <select name="Stroke" value={formData.Stroke} onChange={handleChange}>
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label>Heart Disease or Attack (HeartDiseaseorAttack):</label>
            <select name="HeartDiseaseorAttack" value={formData.HeartDiseaseorAttack} onChange={handleChange}>
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label>BMI:</label>
            <input type="number" name="BMI" value={formData.BMI} onChange={handleChange} />
          </div>
          <div>
            <label>Physical Activity (PhysActivity):</label>
            <input type="number" name="PhysActivity" value={formData.PhysActivity} onChange={handleChange} />
          </div>
          <div>
            <label>General Health (GenHlth):</label>
            <input type="number" name="GenHlth" value={formData.GenHlth} onChange={handleChange} />
          </div>
          <div>
            <label>Mental Health (MentHlth):</label>
            <input type="number" name="MentHlth" value={formData.MentHlth} onChange={handleChange} />
          </div>
          <div>
            <label>Physical Health (PhysHlth):</label>
            <input type="number" name="PhysHlth" value={formData.PhysHlth} onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>

      </div>

    </>
  );
};

export default Home;
