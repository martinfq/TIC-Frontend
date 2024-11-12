import { useEffect, useState } from 'react';
import getToken from '../utils/getToken';
import manage401 from '../utils/manage401';

const API_URL = import.meta.env.VITE_API_URL;

export function usePrediction() {
    const [data, setData] = useState({ value: null, class: null });

    const fetchPrediction = async (token) => {
        try {
            const response = await fetch(API_URL + `/last-predict/`, {
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
            const predictionResult = result.prediction != null ? Math.round(result.prediction * 100) : null
            setData({ value: predictionResult , class: result.class });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const token = getToken();
        if (token) fetchPrediction(token);
    }, []);

    return data;
}
