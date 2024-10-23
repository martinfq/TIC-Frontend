import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const API_URL = import.meta.env.VITE_API_URL;

function PredictionCard() {
    const [preditc, setPredict] = useState(null);

    useEffect(() => {
        const token = Cookies.get('auth');
        const fetchPredict = async (emailToken) => {
            try {
                const response = await fetch(API_URL + `/last-predict/?email=${emailToken}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                const prediction = result.prediction
                setPredict(Math.round(prediction * 100));
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
        <div
            className={`p-8 rounded-lg shadow-lg w-full text-center mt-6 ${preditc !== null
                ? preditc < 50
                    ? 'bg-green-500'
                    : preditc >= 50 && preditc < 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                : 'bg-gray-300'
                }`}
        >
            <h2 className="text-2xl font-semibold text-white">Prediction</h2>
            <p className="mt-4 text-4xl text-white">{preditc ? `${preditc}%` : 'N/A'}</p>
        </div>
    );
}

export default PredictionCard;