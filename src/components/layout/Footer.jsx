import React from 'react';

function Footer() {
    return (
        <footer className="w-full flex p-4 justify-center items-center bg-primary text-white text-center">
            <div className="font-medium">
                &copy; {new Date().getFullYear()} Escuela Politécnica Nacional
            </div>
        </footer>
    );
}

export default Footer;
