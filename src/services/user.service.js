import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://api.docker.localhost/v0/';

class UserService {
    getProfile() {
        return axios.get(API_URL + 'profile', { headers: authHeader() });
    }


}

export default new UserService();