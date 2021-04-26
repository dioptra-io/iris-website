import axios from 'axios';
import authHeader from './auth-header';


class TargetService {
    getTargets() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/targets/',
            { headers: authHeader() }
        ).then(response => {
            return response;
        }).catch(function () {
            localStorage.removeItem('user')
            document.location.href = '/';
        });
    }


}

export default new TargetService();
