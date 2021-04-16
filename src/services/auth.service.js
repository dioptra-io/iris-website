import axios from 'axios';


class AuthService {
    login(user) {
        const params = new URLSearchParams();
        params.append('username', user.username);
        params.append('password', user.password);
        return axios
            .post(process.env.VUE_APP_BACKEND_URL + '/profile/token', params)
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(process.env.VUE_APP_BACKEND_URL + '/signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();