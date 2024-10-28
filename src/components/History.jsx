import React, { useEffect, useState } from 'react';
import NavBar from './layout/NavBar';
import getToken from '../utils/getToken';
import manage401 from '../utils/manage401';

const API_URL = import.meta.env.VITE_API_URL;
function History() {
    const [predictions, setPredict] = useState(null);

    const fetchPredict = async (token) => {
        try {
            const response = await fetch(API_URL + `/predict/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Agrega el token aquí
                },
            });
            if (response.status === 401) {
                manage401()
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

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                {predictions ?
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th className={styles.th}>Date</th>
                                <th className={styles.th}>Prediction</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {predictions.map((item, index) => (
                                <tr key={index} className={styles.tr}>
                                    <td className={styles.td}>{item.date}</td>
                                    <td className={styles.td}>{item.prediction.toFixed(4)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <h1>Cargando</h1>
                }
            </div>
        </>
    );
}

export default History;

const styles = {
    container: "max-w-4xl mx-auto my-6 p-4 bg-gray-50 rounded-lg shadow-md",
    table: "min-w-full bg-white border border-gray-300",
    thead: "bg-gray-200",
    th: "py-2 px-4 border-b",
    tbody: "",
    tr: "hover:bg-gray-100",
    td: "py-2 px-4 border-b",
};
