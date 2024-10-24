import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import getToken from '../../utils/getToken';


const swalAlerts = withReactContent(Swal);


const API_URL = import.meta.env.VITE_API_URL;


function PredictionForm() {
    const [authToken, setAuthToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        const {token} = getToken();
        if (token) {
            setAuthToken(token)
        }
    }, []);

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
        try {
            const response = await fetch(API_URL + '/predict/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(formattedData),
            });
    
            if (response.ok) {
                swalAlerts.fire({
                    title: 'Predicción creada correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if(result.isConfirmed) window.location.reload();
                  })
            } else {
                alert('Error submitting data');
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
        <div className="w-3/5 p-3">
            <h1 className={styles.formTitle}>Crea una predicción</h1>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { field: 'HighBp', label: 'Alta presión arterial' },
                        { field: 'HighChol', label: 'Colesterol alto' },
                        { field: 'Smoker', label: 'Fumador habitual' },
                        { field: 'Stroke', label: 'Ha sufrido un derrame cerebral' },
                        { field: 'HeartDiseaseorAttack', label: 'Enfermedad cardíaca o ataque' },
                    ].map(({ field, label }) => (
                        <div key={field}>
                            <label className={styles.inputLabel}>
                                {label}:
                            </label>
                            <select
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className={styles.inputSelect}
                            >
                                <option value="">Select</option>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    ))}
                    {[
                        { field: 'BMI', label: 'Índice de Masa Corporal (BMI)' },
                        { field: 'PhysActivity', label: 'Actividad física' },
                        { field: 'GenHlth', label: 'Salud general' },
                        { field: 'MentHlth', label: 'Salud mental' },
                        { field: 'PhysHlth', label: 'Salud física' },
                    ].map(({ field, label }) => (
                        <div key={field}>
                            <label className={styles.inputLabel}>
                                {label}:
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
                </div>
                <button type="submit" className={styles.submitButton}>
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default PredictionForm;

const styles = {
    formContainer: 'bg-white p-6 rounded-lg shadow-md w-full max-w-7xl mx-auto',
    formTitle: 'text-2xl font-bold mb-4 text-center',
    inputLabel: 'block mb-2 font-medium',
    inputSelect: 'w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300',
    inputField: 'w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300',
    submitButton: 'w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200',
};
