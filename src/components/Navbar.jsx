import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ setEmail, setAuthToken }) => {
  const handleLogout = () => {
    Cookies.remove('auth');
    window.location.reload();
  };

  const token = Cookies.get('auth');
  let email = '';

  if (token) {
    email = jwtDecode(token).email;
    setAuthToken(token);
    setEmail(email);
  } else {
    console.error('No auth token found.');
  }

  return (
    <nav className="w-full flex flex-col md:flex-row justify-between items-center bg-blue-600 p-4 text-white">
      <ul className="flex space-x-4 mb-2 md:mb-0">
        <li>
          <a href="/" className="hover:underline">Home</a>
        </li>
        <li>
          <a href="/history" className="hover:underline">Historial</a>
        </li>
      </ul>
      <h3 className="text-lg">Bienvenido {email}!</h3>
      <button
        className="bg-red-500 hover:bg-red-600 transition duration-200 p-2 rounded"
        onClick={handleLogout}
      >
        Salir
      </button>
    </nav>
  );
};

export default Navbar;
