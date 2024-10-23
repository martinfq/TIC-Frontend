import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import NavBar from './main/NavBar';
import PredictionForm from './main/PredictionForm';
import UserCards from './main/UserCards';
import PredictionCard from './main/PredictionCard';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {

  return (
    <>
      <NavBar />
      <div className={`${styles.container} `}>
        <PredictionForm />
        <div className="w-2/5 p-2">
          <h1 className={styles.formTitle}>Información</h1>
          <UserCards />
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
  formTitle: 'text-2xl font-bold mb-4 text-center',
};
