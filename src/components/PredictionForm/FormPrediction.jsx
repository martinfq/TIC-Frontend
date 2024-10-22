import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import fieldLabelsData from './fieldsForm.json';

const swalAlerts = withReactContent(Swal);

const FormPrediction = ({ authToken, setPrediction }) => {
  const [formData, setFormData] = useState({
    HighBp: false,
    HighChol: false,
    Smoker: false,
    Stroke: false,
    HeartDiseaseorAttack: false,
    BMI: '',
    PhysActivity: '',
    GenHlth: '',
    MentHlth: '',
    PhysHlth: '',
  });

  const [fieldLabels, setFieldLabels] = useState({}); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFieldLabels(fieldLabelsData);
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    swalAlerts.fire({
      title: 'Enviando...',
      text: 'Por favor, espera mientras se procesa tu solicitud.',
      allowOutsideClick: false,
      didOpen: () => {
        swalAlerts.showLoading();
      },
    });

    const formattedData = {
      HighBp: formData.HighBp ? 1.0 : 0.0,
      HighChol: formData.HighChol ? 1.0 : 0.0,
      Smoker: formData.Smoker ? 1.0 : 0.0,
      Stroke: formData.Stroke ? 1.0 : 0.0,
      HeartDiseaseorAttack: formData.HeartDiseaseorAttack ? 1.0 : 0.0,
      BMI: parseFloat(formData.BMI),
      PhysActivity: parseFloat(formData.PhysActivity),
      GenHlth: parseFloat(formData.GenHlth),
      MentHlth: parseFloat(formData.MentHlth),
      PhysHlth: parseFloat(formData.PhysHlth),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/predict/register', {
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
        swalAlerts.fire({
          title: 'Predicción creada correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        throw new Error('Error al enviar los datos');
      }
    } catch (error) {
      swalAlerts.fire({
        title: 'Error',
        text: 'Error al enviar los datos. Revise los datos ingresados',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {['HighBp', 'HighChol', 'Smoker', 'Stroke', 'HeartDiseaseorAttack'].map((field) => (
        <div key={field} className="flex items-center mb-4">
          <input
            type="checkbox"
            name={field}
            checked={formData[field]}
            onChange={handleChange}
            className="mr-2"
            disabled={isSubmitting}
          />
          <label className="font-medium">
            {fieldLabels[field]}
          </label>
        </div>
      ))}
      {['BMI', 'PhysActivity', 'GenHlth', 'MentHlth', 'PhysHlth'].map((field) => (
        <div key={field}>
          <label className="block mb-2 font-medium">
            {fieldLabels[field]}
          </label>
          <input
            type="number"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            disabled={isSubmitting}
          />
        </div>
      ))}
      <button
        type="submit"
        className={`w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ${isSubmitting ? 'cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
};

export default FormPrediction;
