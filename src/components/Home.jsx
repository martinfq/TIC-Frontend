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
    // <div className="flex flex-col min-h-screen">
    //   <NavBar/>
    //   <main className="flex px-6 pt-4 bg-gray-100 min-h-screen place-items-center gap-x-4 items-start">
    //     <PredictionForm />
    //     <div className="w-2/5 p-3">
    //       <h1 className="text-2xl font-bold text-center">Información</h1>
    //       <UserCards />
    //       <h1 className="text-2xl mt-10 mb-2 font-bold text-center">Diagnostico</h1>
    //       <PredictionCard />
    //       <h1 className="text-2xl mt-10 mb-2 font-bold text-center">Recomendaciones</h1>
    //       <RecomendationCard />
    //     </div>
    //   </main>
    //   <Footer/>
    // </div>




<div className="flex flex-col min-h-screen">
<NavBar/>
<main className="flex-grow bg-gray-100">
  <div className="container mx-auto px-4 py-6">
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Form section - full width on mobile, 3/5 on desktop */}
      <div className="w-full lg:w-3/5">
        <PredictionForm />
      </div>
      
      {/* Information section - full width on mobile, 2/5 on desktop */}
      <div className="w-full lg:w-2/5 space-y-6">
        <section>
          <h1 className="text-2xl font-bold text-center mb-4">
            Información
          </h1>
          <UserCards />
        </section>

        <section>
          <h1 className="text-2xl font-bold text-center mb-4">
            Diagnostico
          </h1>
          <PredictionCard />
        </section>

        <section>
          <h1 className="text-2xl font-bold text-center mb-4">
            Recomendaciones
          </h1>
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