import axios from 'axios';


class AgentService {
    getAgents() {
        return axios.get(process.env.VUE_APP_BACKEND_URL + '/agents/');
    }


}

export default new AgentService();
