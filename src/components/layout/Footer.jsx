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
        <footer className={styles.footer}>
            <div className={styles.footerCopyright}>
                &copy; 2024 Escuela Politécnica Nacional
            </div>
        </footer>
    );
}

export default Footer;

const styles = {
    footer: 'w-full flex flex-col p-4 mt-4 justify-between items-center bg-primary  text-white text-center',
    footerCopyright: 'flex items-center font-medium p-2'
};
