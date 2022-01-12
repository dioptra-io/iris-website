import axios from 'axios';


class ChProxyService {
    query(query) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/users/me/services',
            { withCredentials: true }
        ).then(response => {
            var credentials = response.data;
            return axios.get(
                `${credentials.chproxy_url}&user=${credentials.chproxy_username}&password=${credentials.chproxy_password}&query=${query}`,
            );
        });
    }
}

export default new ChProxyService();
