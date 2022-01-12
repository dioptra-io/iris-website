import axios from 'axios';
import UserService from './user.service';

class AuthService {
    login(user) {
        const params = new URLSearchParams();
        params.append('username', user.email);
        params.append('password', user.password);

        return axios.post(
            process.env.VUE_APP_BACKEND_URL + '/auth/cookie/login',
            params,
            { withCredentials: true }
        ).then(() => {
            return UserService.getUserMe().then(response => {
                localStorage.setItem('user', JSON.stringify(response.data));
                return response.data;
            });
        });
    }

    logout() {
        return axios.post(
            process.env.VUE_APP_BACKEND_URL + '/auth/cookie/logout',
            {},
            { withCredentials: true }
        )
    }

    register(user) {
        return axios.post(process.env.VUE_APP_BACKEND_URL + '/auth/register', {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();
