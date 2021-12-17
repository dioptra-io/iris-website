import axios from 'axios';
import authHeader from './auth-header';


class AgentService {
    getAgents() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/agents/',
            { headers: authHeader() }
        ).then(response => {
            return response;
        });
    }


}

export default new AgentService();
