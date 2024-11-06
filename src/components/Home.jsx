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
    <>
      <NavBar/>
      <div className={`${styles.container} `}>
        <PredictionForm />
        <div className="w-2/5 p-3">
          <h1 className={styles.formTitleTop}>Información</h1>
          <UserCards />
          <h1 className={styles.formTitleBott}>Diagnóstico</h1>
          <PredictionCard />
          <h1 className={styles.formTitleBott}>Recomendaciones</h1>
          <RecomendationCard />
        </div>
      </div>
      <Footer/>
    </>
  )
};

export default Home;

const styles = {
  container: 'flex px-6 pt-4 bg-gray-100 min-h-screen place-items-center gap-x-4 items-start',
  logoutButton: 'bg-red-500 hover:bg-red-600 transition duration-200 p-2 rounded',
  predictionText: 'mt-4 text-xl',
  formTitleTop: 'text-2xl font-bold text-center',
  formTitleBott: 'text-2xl mt-10 mb-2 font-bold text-center',
};
