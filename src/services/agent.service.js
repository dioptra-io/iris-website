import axios from 'axios';


class AgentService {
    getAgents() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/agents/',
            { withCredentials: true }
        );
    }


}

export default new AgentService();
