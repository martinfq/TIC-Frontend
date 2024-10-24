import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function getToken() {
    const token = Cookies.get('auth');
    if (token) {
        const emailToken = jwtDecode(token).sub;
        return { token: token, email: emailToken }
    }
    return null
}

export default getToken;