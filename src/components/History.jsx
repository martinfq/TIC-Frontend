import React, { useEffect, useState } from 'react';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import getToken from '../utils/getToken';
import manage401 from '../utils/manage401';

const API_URL = import.meta.env.VITE_API_URL;

function History() {
    const [predictions, setPredict] = useState(null);
    const [selectedPrediction, setSelectedPrediction] = useState(null); // Estado para la predicción seleccionada
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

    const fetchPredict = async (token) => {
        try {
            const response = await fetch(API_URL + `/predict/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 401) {
                manage401();
            }
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const result = await response.json();
            setPredict(result);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const token = getToken();
        if (token) fetchPredict(token);
    }, []);

    // Función para manejar la selección y apertura del modal
    const handleButtonClick = (item) => {
        setSelectedPrediction(item); // Guarda solo la predicción seleccionada
        setIsModalOpen(true); // Abre el modal
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPrediction(null); // Limpia la predicción seleccionada
    };

    // Función para formatear campos booleanos o numéricos a texto legible
    const formatValue = (key, value) => {
        const booleanFields = ["Stroke", "HighBp", "HeartDiseaseorAttack", "PhysActivity", "Smoker", "HighChol"];
        if (booleanFields.includes(key)) {
            return value === 1.0 ? "Si" : "No";
        }
        if(key === "GenHlth"){
            const GenHlthDescriptions = {
                1: "Muy Mala",
                2: "Mala",
                3: "Regular",
                4: "Buena",
                5: "Excelente"
            };
            return GenHlthDescriptions[value];
        }
        return value; // Si no es booleano, devolver el valor tal cual
    };

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                {predictions ? (
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th className={styles.th}>Date</th>
                                <th className={styles.th}>Prediction</th>
                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {predictions.map((item, index) => (
                                <tr key={index} className={styles.tr}>
                                    <td className={styles.td}>{item.date}</td>
                                    <td className={styles.td}>{(item.prediction*100).toFixed(2)}%</td>
                                    <td className={styles.td}>
                                        <button
                                            onClick={() => handleButtonClick(item)}
                                            className={styles.button}
                                        >
                                            Ver Detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1>Cargando</h1>
                )}
            </div>

            {isModalOpen && selectedPrediction && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>Detalles de la Predicción</h2>

                        <div className={styles.modalSection}>
                            <h3>Datos de Salud</h3>
                            <ul>
                                <li><strong>Historial de derrame cerebral:</strong> {formatValue("Stroke", selectedPrediction.Stroke)}</li>
                                <li><strong>Presion Arterial Alta:</strong> {formatValue("HighBp", selectedPrediction.HighBp)}</li>
                                <li><strong>Enfermedad Cardiovascular:</strong> {formatValue("HeartDiseaseorAttack", selectedPrediction.HeartDiseaseorAttack)}</li>
                                <li><strong>Actividad Física en el último mes:</strong> {formatValue("PhysActivity", selectedPrediction.PhysActivity)}</li>
                                <li><strong>Fumador Habitual:</strong> {formatValue("Smoker", selectedPrediction.Smoker)}</li>
                                <li><strong>Colesterol Alto:</strong> {formatValue("HighChol", selectedPrediction.HighChol)}</li>
                                <li><strong>Salud General:</strong> {formatValue("GenHlth", selectedPrediction.GenHlth)}</li>
                                <li><strong>Problemas con su Salud Física:</strong> {selectedPrediction.PhysHlth} días</li>
                                <li><strong>Problemas con su Salud Mental:</strong> {selectedPrediction.MentHlth} días</li>
                                <li><strong>Edad:</strong> {selectedPrediction.Age} años</li>
                                <li><strong>Índice de Masa Corporal (BMI):</strong> {selectedPrediction.BMI}</li>
                                <li><strong>Predicción de riesgo:</strong> {(selectedPrediction.prediction*100).toFixed(2)}%</li>
                            </ul>
                        </div>

                        <button onClick={closeModal} className={styles.closeButton}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
            <Footer/>
        </>
    );
}

export default History;

const styles = {
    container: "max-w-4xl mx-auto my-6 p-4 bg-gray-50 rounded-lg shadow-md",
    table: "min-w-full bg-white border border-gray-300",
    thead: "bg-gray-200",
    th: "py-2 px-4 border-b text-left",
    tbody: "",
    tr: "hover:bg-gray-100",
    td: "py-2 px-4 border-b",
    button: "bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600",
    modalOverlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
    modalContent: "bg-white p-6 rounded shadow-md max-w-lg w-full",
    closeButton: "bg-red-500 text-white px-4 py-1 rounded mt-4 hover:bg-red-600",
    modalSection: "mb-4"
};
