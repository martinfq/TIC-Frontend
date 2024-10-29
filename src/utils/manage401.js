import Cookies from 'js-cookie';

function manage401() {
    Cookies.remove('auth');
    window.location.reload();
}

export default manage401;