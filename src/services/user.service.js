import axios from 'axios';
import authHeader from './auth-header';


class UserService {
    getProfile() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/profile',
            { headers: authHeader() }
        );
    }


}

export default new UserService();