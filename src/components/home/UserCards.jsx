import React, { useEffect, useState } from 'react';
import getToken from '../../utils/getToken';
import { jwtDecode } from 'jwt-decode';
const API_URL = import.meta.env.VITE_API_URL;

function UserCards() {
    const [data, setData] = useState(null);

    const fetchUserInfo = async (token) => {
        try {
            const response = await fetch(API_URL + `/user/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Agrega el token aquí
                },
            });
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        const token = getToken();
        if (token) {
            fetchUserInfo(token)
        }
    }, []);

    return (
        <div className="w-full">
            <div className="flex justify-center space-x-4 mt-6">
                {/* Tarjeta 3: Name */}
                <div className="bg-white p-6 rounded-lg shadow-md w-1/3 text-center">
                    <h2 className="text-xl font-semibold">Nombre</h2>
                    <p className="text-gray-700 mt-2">{data?.name || 'N/A'}</p>
                </div>
                {/* Tarjeta 2: Age */}
                <div className="bg-white p-6 rounded-lg shadow-md w-1/3 text-center">
                    <h2 className="text-xl font-semibold">Edad</h2>
                    <p className="text-gray-700 mt-2">{data?.age || 'N/A'}</p>
                </div>
                {/* Tarjeta 1: Gender */}
                <div className="bg-white p-6 rounded-lg shadow-md w-1/3 text-center">
                    <h2 className="text-xl font-semibold">Género</h2>
                    <p className="text-gray-700 mt-2">
                        {data?.gender || 'N/A'}
                    </p>

                </div>
            </div>
        </div>
    );
}

export default UserCards;