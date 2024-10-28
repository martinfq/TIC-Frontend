import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import getToken from '../../utils/getToken';
import { jwtDecode } from 'jwt-decode';

function NavBar() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const token = getToken();
        if(token){

            const emailToken = jwtDecode(token).sub;
            setEmail(emailToken)
        }
        
    }, []);

    const handleLogout = () => {
        Cookies.remove('auth');
        window.location.href = '/';
    };

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logo}> Predicción de Diabetes</h1>
            <h3 className={styles.welcomeText}>Bienvenido {email}!</h3>
            <div className="flex items-center space-x-4">
                <ul className={styles.navbarLinks}>
                    <li>
                        <a href="/" className="hover:underline">Home</a>
                    </li>
                    <li>
                        <a href="/historial" className="hover:underline">Historial</a>
                    </li>
                </ul>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Salir
                </button>
            </div>
        </nav>
    );
}

export default NavBar;

const styles = {
    navbar: 'w-full flex justify-between items-center bg-blue-600 p-4 text-white',
    navbarLinks: 'flex space-x-4 text-xl',
    welcomeText: 'text-xl',
    logoutButton: 'bg-red-500 hover:bg-red-600 transition duration-200 p-2 rounded',
    logo: 'text-2xl'
};
