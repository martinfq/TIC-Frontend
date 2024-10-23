import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
const API_URL = import.meta.env.VITE_API_URL;

function UserCards() {
    const [email, setEmail] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = Cookies.get('auth');

        const fetchData = async (emailToken) => {
            try {
                const response = await fetch(API_URL + `/user/?email=${emailToken}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error(err);
            }
        };

        if (token) {
            setAuthToken(token);
            const emailToken = jwtDecode(token).sub;
            setEmail(emailToken);
            fetchData(emailToken);
        }
    }, []);

    return (
        <div className="md:pl-4 w-full max-w-md">
            <div className="flex justify-center space-x-4 mt-6">
                {/* Tarjeta 1: Gender */}
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
                    <h2 className="text-xl font-semibold">Gender</h2>
                    <p className="text-gray-700 mt-2">{data?.gender || 'N/A'}</p>
                </div>

                {/* Tarjeta 2: Age */}
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
                    <h2 className="text-xl font-semibold">Age</h2>
                    <p className="text-gray-700 mt-2">{data?.age || 'N/A'}</p>
                </div>

                {/* Tarjeta 3: Name */}
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
                    <h2 className="text-xl font-semibold">Name</h2>
                    <p className="text-gray-700 mt-2">{data?.name || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default UserCards;