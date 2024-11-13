import React, { useEffect, useState } from 'react';
import NavBar from './layout/NavBar';
import PredictionForm from './home/PredictionForm';
import UserCards from './home/UserCards';
import PredictionCard from './home/PredictionCard';
import RecomendationCard from './home/RecomendationCard';
import Footer from './layout/Footer';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  return (
<div className="flex flex-col min-h-screen">
<NavBar/>
<main className="flex-grow bg-gray-100">
  <div className="container mx-auto px-4 py-6">
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-3/5">
        <PredictionForm />
      </div>
            <div className="w-full lg:w-2/5 space-y-6">
        <section>
          <h1 className="text-2xl font-bold text-center mb-4">
            Información
          </h1>
          <UserCards />
        </section>

        <section>
          <h1 className="text-2xl font-bold text-center mb-4">
            Diagnóstico
          </h1>
          <PredictionCard />
        </section>

        <section>
          <RecomendationCard />
        </section>
      </div>
    </div>
  </div>
</main>
<Footer/>
</div>
  );
};

export default Home;