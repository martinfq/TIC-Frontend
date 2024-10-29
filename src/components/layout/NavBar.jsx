import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Cookies from 'js-cookie';
import getToken from '../../utils/getToken';

function NavBar() {
    const [email, setEmail] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
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
        <nav className="w-full bg-blue-600 text-white shadow-md">
            {/* Escritorio y Mobile  */}
            <div className="max-w-[1440px] mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <h1 className="text-xl md:text-2xl font-semibold">
                        Predicción de Diabetes
                    </h1>

                    {/* Bienvenido Escritorio */}
                   <div className="hidden md:flex items-center space-x-8">
                        <h3 className="text-lg">
                                Bienvenido {email}!
                        </h3>
                   </div>

                    {/* Navegacion Escritorio */}
                    <div className="hidden md:flex items-center space-x-8">
                        <ul className="flex items-center space-x-6 text-lg">
                            <li>
                                <a 
                                    href="/" 
                                    className="hover:text-blue-200 hover:underline transition-colors duration-200"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/historial" 
                                    className="hover:text-blue-200 hover:underline transition-colors duration-200"
                                >
                                    Historial
                                </a>
                            </li>
                        </ul>
                        <button 
                            onClick={handleLogout}
                            className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200 text-sm font-medium"
                        >
                            Salir
                        </button>
                    </div>

                    {/* Boton del Menu en Mobile */}
                    <button 
                        className="md:hidden p-2 hover:bg-blue-700 rounded-md"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* Menu Mobile */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-4 pt-2 pb-4 space-y-3 bg-blue-600 border-t border-blue-500">
                    <h3 className="text-lg py-2 border-b border-blue-500">
                        Bienvenido {email}!
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <a 
                                href="/" 
                                className="block py-2 hover:bg-blue-700 rounded-md px-3 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a 
                                href="/historial" 
                                className="block py-2 hover:bg-blue-700 rounded-md px-3 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Historial
                            </a>
                        </li>
                    </ul>
                    <div className="pt-2">
                        <button 
                            onClick={handleLogout}
                            className="w-full bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200 text-sm font-medium"
                        >
                            Salir
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

const styles = {
    navbar: 'w-full flex flex-col md:flex-row justify-between items-center bg-blue-600 p-4 text-white ',
    navbarLinks: 'flex space-x-6 mb-2 text-xl md:mb-0',
    welcomeText: 'text-xl',
    logoutButton: 'bg-blue-700 p-2 rounded shadow transition duration-500 hover:shadow-lg hover:bg-blue-600',
    logo: 'text-2xl font-semibold'
};
