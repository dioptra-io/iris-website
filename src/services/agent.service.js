import axios from 'axios';
import authHeader from './auth-header';


class AgentService {
    getAgents() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/agents/',
            { headers: authHeader() }
        ).then(response => {
            return response;
        }).catch((error) => {
            if (error.response.status == 401) {
                localStorage.removeItem('user')
                document.location.href = '/#/login';
            }
            throw new Error("Invalid backend request")
        });
    }


}

export default new AgentService();
