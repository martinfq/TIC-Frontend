import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import getToken from '../../utils/getToken';

function NavBar() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const {email} = getToken();
        if (email) {
            setEmail(email)
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('auth');
        window.location.href = '/';
    };

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarLinks}>
                <li>
                    <a href="/" className="hover:underline">Home</a>
                </li>
                <li>
                    <a href="/historial" className="hover:underline">Historial</a>
                </li>
            </ul>
            <h3 className={styles.welcomeText}>Bienvenido {email}!</h3>
            <div>
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
    navbarLinks: 'flex space-x-4',
    welcomeText: 'text-lg',
    logoutButton: 'bg-red-500 hover:bg-red-600 transition duration-200 p-2 rounded',
};
