import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
function getToken() {
    const token = Cookies.get('auth');
    if (token) {
        return  token;
    }
    window.location.href = '/'
    
}

export default getToken;  