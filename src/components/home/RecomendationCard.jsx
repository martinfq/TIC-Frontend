import React, { useEffect, useState } from 'react';
import getToken from '../../utils/getToken';
import manage401 from '../../utils/manage401';
import recomendationData from '../Data/recomentadions.json'


const API_URL = import.meta.env.VITE_API_URL;

function RecomendationCard() {

    const CheckIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 text-green-500 inline mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M5 13l4 4L19 7"
            />
        </svg>
    );

    return (
        <div className={"p-8 rounded-lg shadow-lg w-full text-justify bg-white mx-w-md transition-all duration-500 hover:scale-105 hover:shadow-blue-600"}>
            <ul className="text-xl text-gray-700">
                {recomendationData.recommendations.map((recommendation, index) =>(
                    <li key={index} className="flex items-center">
                        <CheckIcon />
                        {recommendation.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecomendationCard;