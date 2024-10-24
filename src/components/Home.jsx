import React, { useEffect, useState } from 'react';
import NavBar from './layout/NavBar';
import PredictionForm from './home/PredictionForm';
import UserCards from './home/UserCards';
import PredictionCard from './home/PredictionCard';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  return (
    <>
      <NavBar/>
      <div className={`${styles.container} `}>
        <PredictionForm />
        <div className="w-2/5 p-2">
          <h1 className={styles.formTitle}>Información</h1>
          <UserCards />
          <h1 className={styles.formTitle}>Diagnostico</h1>
          <PredictionCard />
        </div>
      </div>
    </>
  )
};

export default Home;

const styles = {
  container: 'flex px-6 pt-4 bg-gray-100 min-h-screen place-items-center gap-x-4 items-start',
  logoutButton: 'bg-red-500 hover:bg-red-600 transition duration-200 p-2 rounded',
  predictionText: 'mt-4 text-xl',
  formTitle: 'text-2xl font-bold my-4 text-center',
};
