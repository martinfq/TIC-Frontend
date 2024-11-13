import React from 'react';
import { usePrediction } from '../../hooks/useLastPrediction';

function PredictionCard() {
    const prediction = usePrediction();

    if(prediction.class == "1" || prediction.class == null){
        return (
            <div
                className={`p-8 rounded-lg shadow-lg w-full text-center mt-6
                    ${prediction.value === null ? 'bg-gray-400' 
                        : prediction.value < 50 ? 'bg-green-500' 
                            : prediction.value < 60 ? 'bg-yellow-500' 
                                : 'bg-red-500'
                    }`}
            >
                <h2 className="text-2xl font-semibold text-white">Riesgo de diabetes:</h2>
                <p className="mt-4 text-4xl text-white">
                    {prediction.value !== null ? `${prediction.value}%` : 'No tiene predicciones'}
                </p>
            </div>
        );
    }
    else if(prediction.class == "0"){
        return (
            <div
                className={`p-8 rounded-lg shadow-lg w-full text-center mt-6 bg-green-500`}
            >
                <h2 className="text-2xl font-semibold text-white">Felicidades, se encuentra saludable.</h2>
                <p className="mt-4 text-4xl text-white">
                    {'No presenta riesgo de diabetes'}
                </p>
            </div>
        );
    }
}

export default PredictionCard;