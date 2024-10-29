import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import getToken from '../../utils/getToken';

function Footer() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const { email } = getToken();
        if (email) {
            setEmail(email)
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('auth');
        window.location.href = '/';
    };


    return (
        <footer className="w-full flex flex-col p-4 mt-4 justify-between items-center bg-blue-600  text-white text-center">
            <div className="flex items-center font-medium p-2'">
                &copy; {new Date().getFullYear()} Escuela Politécnica Nacional
            </div>
        </footer>
    );
}

export default Footer;
