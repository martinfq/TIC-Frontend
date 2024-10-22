import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL;

function NavBar() {
    const [email, setEmail] = useState('');
    const [authToken, setAuthToken] = useState('');
    useEffect(() => {
        const token = Cookies.get('auth');
        if (token) {
            setAuthToken(token);
            const emailToken = jwtDecode(token).sub;
            setEmail(emailToken);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('auth');
        window.location.reload();
    };


    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarLinks}>
                <li>
                    <a href="/" className="hover:underline">Home</a>
                </li>
                <li>
                    <a href="/about" className="hover:underline">About</a>
                </li>
            </ul>
            <h3 className={styles.welcomeText}>Bienvenido {email}!</h3>
            <button className={styles.logoutButton} onClick={handleLogout}>
                Salir
            </button>
        </nav>
    );
}

export default NavBar;

const styles = {
    container: 'flex flex-col items-center p-6 bg-gray-100 min-h-screen',
    navbar: 'w-full flex justify-between items-center bg-blue-600 p-4 text-white',
    navbarLinks: 'flex space-x-4',
    welcomeText: 'text-lg',
    logoutButton: 'bg-red-500 hover:bg-red-600 transition duration-200 p-2 rounded',
};