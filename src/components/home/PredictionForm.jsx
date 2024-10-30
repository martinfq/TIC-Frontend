import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import getToken from '../../utils/getToken';
import fieldLabelsData from '../Data/fieldsForm.json';
import Select from 'react-select';


const swalAlerts = withReactContent(Swal);


const API_URL = import.meta.env.VITE_API_URL;


function PredictionForm() {

    const [fieldLabels, setFieldLabels] = useState({fieldLabelsData}); 
    const [authToken, setAuthToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const optionsMap = {
        PhysActivity: [{ value: 0, label: 'No' }, { value: 1, label: 'Si' }],
        GenHlth: [{ value: 1, label: 'Excelente' }, { value: 2, label: 'Buena' } , { value: 3, label: 'Regular' }, { value: 4, label: 'Mala' }, { value: 3, label: 'Muy Mala' }],
        MentHlth: Array.from({ length: 31 }, (_, i) => ({ value: i, label: i.toString() })),
        PhysHlth: Array.from({ length: 31 }, (_, i) => ({ value: i, label: i.toString() })),
    };
    // Al cargar el componente, obtiene el token de autenticación y lo guarda en el estado
    useEffect(() => {
        const token = getToken();
        if (token) {
            setAuthToken(token)
        }
        setFieldLabels(fieldLabelsData);
    }, []);

    // Estado que guarda los datos del formulario
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


    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Función que maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Muestra una alerta de carga con SweetAlert2
        setIsSubmitting(true);
        swalAlerts.fire({
            title: 'Enviando...',
            text: 'Por favor, espera mientras se procesa tu solicitud.',
            allowOutsideClick: false,
            didOpen: () => {
                swalAlerts.showLoading();
            },
        });

        // Formatea los datos del formulario para el envío
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
    

        // Envía los datos formateados a la API
        try {
            const response = await fetch(API_URL + '/predict/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(formattedData),
            });
            
            // Si la respuesta es exitosa, muestra una alerta de éxito y recarga la página
            if (response.ok) {
                swalAlerts.fire({
                    title: 'Predicción creada correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if(result.isConfirmed) window.location.reload();
                  })
            } else {
                throw new Error("Error");
                
            }
            
        } catch (error) {
            // Si hay un error, muestra una alerta de error
            swalAlerts.fire({
                title: 'Error',
                text: 'Error al enviar los datos. Revise los datos ingresados',
                icon: 'error',
                confirmButtonText: 'OK'
              });
        } finally {
            setIsSubmitting(false); // Termina el estado de envío
        }
    };

    // Renderiza el formulario con campos select e input, aplicando estilos de Tailwind CSS
    return (
        <div className="w-3/5 p-3">
            <h1 className={styles.formTitle}>Crea una predicción</h1>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <label className="font-medium">¿Presenta usted alguno de los siguientes antecedentes o factores de riesgo para la salud?</label>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                        {['HighBp', 'HighChol', 'Smoker', 'Stroke', 'HeartDiseaseorAttack'].map((field) => (
                            <div key={field}>
                                <input
                                    type="checkbox"
                                    name={field}
                                    checked={formData[field]}
                                    onChange={handleChange}
                                    className="mr-2"
                                    disabled={isSubmitting}
                                />
                                <label>
                                    {fieldLabels[field]?.label}
                                </label>
                                {fieldLabels[field]?.comment &&(
                                    <p className="text-gray-500 text-sm">
                                        {fieldLabels[field].comment}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div key="BMI" className="grid grid-cols-1 mt-3">
                        <label className="block mb-2 font-medium">
                            {fieldLabels['BMI']?.label}
                        </label>
                        <input
                            type="number"
                            name="BMI"
                            value={formData['BMI']}
                            onChange={handleChange}
                            min="12"
                            className={styles.inputSelect}
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['PhysActivity', 'GenHlth', 'MentHlth', 'PhysHlth'].map((field) => (
                            <div key={field}>
                                <label className="block mb-2 font-medium">
                                    {fieldLabels[field]?.label}
                                </label>
                                {fieldLabels[field]?.comment &&(
                                    <p className="text-gray-500 text-sm">
                                        {fieldLabels[field].comment}
                                    </p>
                                )}
                                <Select
                                    options={optionsMap[field]}
                                    onChange={(selectedOption) => handleChange({ target: { name: field, value: selectedOption.value } })}
                                    isDisabled={isSubmitting}
                                    className="mb-4"
                                    maxMenuHeight={120}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button 
                type="submit" 
                className={`w-full p-2 mt-5 bg-primary text-white rounded hover:bg-primary_hover transition duration-200 ${isSubmitting ? 'cursor-not-allowed' : ''}`} 
                disabled={isSubmitting}>
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default PredictionForm;

// Estilos en Tailwind CSS para cada elemento del formulario
const styles = {
    formContainer: 'bg-white p-6 rounded-lg shadow-md w-full max-w-7xl mx-auto',
    formTitle: 'text-2xl font-bold mb-4 text-center',
    inputLabel: 'block mb-2 font-medium',
    inputSelect: 'w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300',
    inputField: 'w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300',
};
