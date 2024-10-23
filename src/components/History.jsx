import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import NavBar from './main/NavBar';

const API_URL = import.meta.env.VITE_API_URL;
function History() {
    const [predictions, setPredict] = useState(null);

    useEffect(() => {
        const token = Cookies.get('auth');
        const fetchPredict = async (emailToken) => {
            try {
                const response = await fetch(API_URL + `/predict/?email=${emailToken}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                setPredict(result);
            } catch (err) {
                console.error(err);
            }
        };

        if (token) {
            const emailToken = jwtDecode(token).sub;
            fetchPredict(emailToken);
        }
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
