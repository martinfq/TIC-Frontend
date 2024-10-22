import React, { useEffect, useState } from 'react';

function PredictionForm() {

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
            alert('Creada correctamente');
        } else {
            alert('Error submitting data');
        }
    };
    return (
        <>
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
        </>
    );
}

export default PredictionForm;

const styles = {
    logoutButton: 'bg-red-500 hover:bg-red-600 transition duration-200 p-2 rounded',
    predictionText: 'mt-4 text-xl',
    formContainer: 'bg-white p-6 rounded-lg shadow-md w-full max-w-md',
    formTitle: 'text-2xl font-bold mb-4 text-center',
    inputLabel: 'block mb-2 font-medium',
    inputSelect: 'w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300',
    inputField: 'w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300',
    submitButton: 'w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200',
};