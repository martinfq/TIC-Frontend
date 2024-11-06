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
    const [errors, setErrors] = useState({}); // Estado para los mensajes de error

    // Opciones para los ComboBox
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


    // Función para manejar cambios en los campos de CheckBox e Input
    const handleChange = (e) => {
        e.preventDefault();
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            [name]: type === 'checkbox' ? checked : value,
        });
        // Quita el mensaje de error del campo
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',  
        }));
    };

    // Función para manejar cambios en los campos de CheckBox e Input
    const handleSelectChange = (name, selectedOption) => {
        setFormData({
            ...formData,
            [name]: selectedOption ? selectedOption.value : '',
        });
        // Quita el mensaje de error del campo
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',  
        }));
    };

    // Función de validación
    const validateFields = () => {
        const newErrors = {};
        if (!formData.BMI) newErrors.BMI = 'El campo de IMC es obligatorio y debe ser mayor a 12';
        if (formData.PhysActivity === '') newErrors.PhysActivity = 'Seleccione una opción para Actividad Física';
        if (formData.GenHlth === '') newErrors.GenHlth = 'Seleccione una opción para Salud General';
        if (formData.MentHlth === '') newErrors.MentHlth = 'Seleccione una opción para Salud Mental';
        if (formData.PhysHlth === '') newErrors.PhysHlth = 'Seleccione una opción para Salud Física';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
            // Validacaion de los campos con error
            if (!validateFields()) return;
        } finally {
            setIsSubmitting(false); // Termina el estado de envío
        }
    };

    // Renderiza el formulario
    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">Crea una predicción</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
                <label className="font-medium">
                    ¿Presenta usted alguno de los siguientes antecedentes o factores de riesgo para la salud?
                </label>
                <div className="space-y-6">
                    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                        {['HighBp', 'HighChol', 'Smoker', 'Stroke', 'HeartDiseaseorAttack'].map((field) => (
                            <div key={field} className="flex items-start space-x-2">
                                <input
                                    type="checkbox"
                                    name={field}
                                    checked={formData[field]}
                                    onChange={handleChange}
                                    className="mt-1"
                                    disabled={isSubmitting}
                                />
                                <div className="flex-1">
                                    <label className="text-sm sm:text-base">
                                        {fieldLabels[field]?.label}
                                    </label>
                                    {fieldLabels[field]?.comment &&(
                                        <p className="text-gray-500 text-xs sm:text-sm mt-1">
                                            {fieldLabels[field].comment}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div key="BMI" className="w-full">
                        <label className="block mb-2 font-medium">
                            {fieldLabels['BMI']?.label}
                        </label>
                        <input
                            type="number"
                            name="BMI"
                            value={formData['BMI']}
                            onChange={handleChange}
                            min="12"
                            className={`w-full p-2 border ${errors.BMI ? 'border-red-500' : 'border-gray-300'} rounded mb-1 focus:outline-none focus:ring focus:ring-blue-300`}
                            disabled={isSubmitting}
                        />
                        {errors.BMI && <p className="text-red-500 text-sm mt-1">{errors.BMI}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {['PhysActivity', 'GenHlth', 'MentHlth', 'PhysHlth'].map((field) => (
                            <div key={field}>
                                <label className="block mb-1 font-medium">
                                    {fieldLabels[field]?.label}
                                </label>
                                {fieldLabels[field]?.comment &&(
                                    <p className="text-gray-500 text-xs sm:text-sm">
                                        {fieldLabels[field].comment}
                                    </p>
                                )}
                                <Select
                                    options={optionsMap[field]}
                                    onChange={(selectedOption) => handleSelectChange(field, selectedOption)}
                                    isDisabled={isSubmitting}
                                    className="mb-2"
                                    maxMenuHeight={120}
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            minHeight: '42px',
                                            borderColor: errors[field] ? 'red' : base.borderColor
                                        })
                                    }}
                                />
                                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    type="submit" 
                    className={`w-full p-3 mt-6 bg-primary text-white rounded hover:bg-primary_hover transition duration-200 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`} 
                    disabled={isSubmitting}
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default PredictionForm;