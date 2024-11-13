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
        if (key === "GenHlth") {
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
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className={styles.container}>
                <h1 className={styles.title}>Historial de Predicciones</h1>
                {predictions ? (
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th className={styles.thDate}>Fecha</th>
                                <th className={styles.thRisk}>Tiene riesgo de diabetes?</th>
                                <th className={styles.thProbability}>Probabilidad de Riesgo</th>
                                <th className={styles.thActions}>Más información</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {predictions.map((item, index) => (
                                <tr
                                    key={index}
                                    className={item.class === 0 ? styles.trGreen : styles.trRed}
                                >
                                    <td className={styles.tdDate}>{item.date}</td>
                                    <td className={styles.tdRisk}>{item.class === 0 ? 'No' : 'Si'}</td>
                                    <td className={styles.tdProbability}>{item.class === 0 ? '' : `${(item.prediction * 100).toFixed(2)}%`}</td>
                                    <td className={styles.tdActions}>
                                        <button onClick={() => handleButtonClick(item)} className={styles.button}>
                                            Ver Detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1>Cargando.......</h1>
                )}
            </main>


            {isModalOpen && selectedPrediction && (
                 <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>Detalles de esta Predicción</h2>

                        <div className={styles.modalSection}>
                            <h3 className={styles.modalSectionTitle}>Sección de Salud General:</h3>
                            <ul className={styles.modalList}>
                                <li className={styles.modalListItem}>
                                    <span className={styles.icon}>{selectedPrediction.Stroke ? '✅' : '❌'}</span>
                                    Historial de Derrame Cerebral: {selectedPrediction.Stroke ? "Sí" : "No"}
                                </li>
                                <li className={styles.modalListItem}>
                                    <span className={styles.icon}>{selectedPrediction.HighBp ? '✅' : '❌'}</span>
                                    Presión Arterial Alta: {selectedPrediction.HighBp ? "Sí" : "No"}
                                </li>
                                <li className={styles.modalListItem}>
                                    <span className={styles.icon}>{selectedPrediction.HeartDiseaseorAttack ? '✅' : '❌'}</span>
                                    Enfermedad Cardiovascular: {selectedPrediction.HeartDiseaseorAttack ? "Sí" : "No"}
                                </li>
                                <li className={styles.modalListItem}>
                                    <span className={styles.icon}>{selectedPrediction.HighChol ? '✅' : '❌'}</span>
                                    Colesterol Alto: {selectedPrediction.HighChol ? "Sí" : "No"}
                                </li>
                                <li className={styles.modalListItem}>
                                    Índice de Masa Corporal (BMI): {selectedPrediction.BMI.toFixed(2)} ({selectedPrediction.BMI < 18.5 ? "Bajo" : selectedPrediction.BMI < 24.9 ? "Normal" : "Alto"})
                                </li>
                            </ul>
                        </div>

                        <div className={styles.modalSection}>
                            <h3 className={styles.modalSectionTitle}>Sección de Hábitos de Salud:</h3>
                            <ul className={styles.modalList}>
                                <li className={styles.modalListItem}>
                                    <span className={styles.icon}>{selectedPrediction.PhysActivity ? '✅' : '❌'}</span>
                                    Actividad Física en el último mes: {selectedPrediction.PhysActivity ? "Sí" : "No"}
                                </li>
                                <li className={styles.modalListItem}>
                                    <span className={styles.icon}>{selectedPrediction.Smoker ? '🚬' : '❌'}</span>
                                    Fumador Habitual: {selectedPrediction.Smoker ? "Sí" : "No"}
                                </li>
                                <li className={styles.modalListItem}>
                                    Salud General: {selectedPrediction.GenHlth ? "⚠️ " + formatValue("GenHlth", selectedPrediction.GenHlth) : ""}
                                </li>
                            </ul>
                        </div>

                        <div className={styles.modalSection}>
                            <h3 className={styles.modalSectionTitle}>Sección de Problemas de Salud:</h3>
                            <ul className={styles.modalList}>
                                <li className={styles.modalListItem}>
                                    Problemas con su Salud Física (Últimos 30 días): {selectedPrediction.PhysHlth} {selectedPrediction.PhysHlth === 1 ? "día" : "días"}
                                </li>
                                <li className={styles.modalListItem}>
                                    Problemas con su Salud Mental (Últimos 30 días): {selectedPrediction.MentHlth} {selectedPrediction.MentHlth === 1 ? "día" : "días"}
                                </li>
                            </ul>
                        </div>

                        <button onClick={closeModal} className={styles.closeButton}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default History;

const styles = {
    container: "w-4/5 mx-auto my-6 p-4 bg-gray-50 rounded-lg shadow-md flex-grow",
    title: "text-2xl font-bold text-center mb-4",
    table: "min-w-full bg-white border border-gray-300",
    thead: "bg-primary text-white",
    th: "py-2 px-4 border-b text-center",
    thDate: "py-2 px-4 border-b text-center w-1/4",
    thRisk: "py-2 px-4 border-b text-center w-1/4",
    thProbability: "py-2 px-4 border-b text-center w-1/4",
    thActions: "py-2 px-4 border-b text-center w-1/4",
    tbody: "",
    trGreen: "hover:bg-green-100 bg-green-50",
    trRed: "hover:bg-red-100 bg-red-50",
    td: "py-2 px-4 border-b text-center",
    tdDate: "py-2 px-4 border-b text-center w-1/4",
    tdRisk: "py-2 px-4 border-b text-center w-1/4",
    tdProbability: "py-2 px-4 border-b text-center w-1/4",
    tdActions: "py-2 px-4 border-b text-center w-1/4",
    button: "bg-secondary hover:bg-secondary_hover text-white px-4 py-1 rounded",
    modalOverlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
    modalContent: "bg-white p-6 rounded shadow-md w-4/5 max-w-screen-lg",
    modalTitle: "text-xl font-bold text-center mb-4",
    modalSectionTitle: "font-semibold text-lg mt-4 mb-2",
    modalList: "list-none pl-0",
    modalListItem: "flex items-center mb-2",
    icon: "mr-2 text-lg",
    closeButton: "bg-secondary hover:bg-secondary_hover text-white px-4 py-1 rounded mt-4",
    modalSection: "mb-4"
};
