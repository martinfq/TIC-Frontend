import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const API_URL = import.meta.env.VITE_API_URL;

function PredictionCard() {
    const [email, setEmail] = useState('');
    const [authToken, setAuthToken] = useState('');

    const [preditc, setPredict] = useState(null);

    useEffect(() => {
        const token = Cookies.get('auth');
        const fetchPredict = async (emailToken) => {
            try {
                const response = await fetch(API_URL + `/predict/?email=${emailToken}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                const prediction = result.predictions
                setPredict(prediction);
            } catch (err) {
                console.error(err);
            }
        };

        if (token) {
            setAuthToken(token);
            const emailToken = jwtDecode(token).sub;
            setEmail(emailToken);
            fetchPredict(emailToken);
        }
    }, []);

    return (
        <div
            className={`p-8 rounded-lg shadow-lg w-full text-center mt-6 ${preditc !== null
                ? preditc < 0.5
                    ? 'bg-green-500'
                    : preditc >= 0.5 && preditc < 0.75
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