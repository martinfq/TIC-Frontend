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
<<<<<<< HEAD

const styles = {
    footer: 'w-full flex flex-col p-4 mt-4 justify-between items-center bg-primary  text-white text-center',
    footerCopyright: 'flex items-center font-medium p-2'
};
=======
>>>>>>> 205b11b01ccda2b64275f494ecca1e7989d09d2b
