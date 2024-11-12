// components/RecomendationCard.js
import React from 'react';
import { usePrediction } from '../../hooks/useLastPrediction';
import recomendationData from '../Data/recomentadions.json';

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

function RecomendationCard() {
    const prediction = usePrediction();
    let riesgoDiabetes = null

    if (prediction.value !== null) {
        if (prediction.value > 60) {
            riesgoDiabetes = "hight";
        } else if (prediction.value >= 50 && prediction.value <= 60) {
            riesgoDiabetes = "medium";
        } else if (prediction.value < 50) {
            riesgoDiabetes = "low";
        }
    }

    const personalizedRecommendations = recomendationData[riesgoDiabetes] || [];

    if(riesgoDiabetes != null && prediction.class == "1"){
        return (
            <>
                <h1 className="text-2xl font-bold text-center mb-4">
                    Recomendaciones
                </h1>
                <div className="p-8 rounded-lg shadow-lg w-full text-justify bg-white mx-w-md">
                    <ul className="text-xl text-gray-700">
                        {personalizedRecommendations.map((recommendation, index) => (
                            <li key={index} className="flex items-center">
                                <CheckIcon />
                                {recommendation}
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }
}

export default RecomendationCard;