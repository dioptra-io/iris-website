import axios from 'axios';
import authHeader from './auth-header';


class ChProxyService {
    query(query) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/users/me/services',
            { headers: authHeader() }
        ).then(response => {
            var credentials = response.data;
            return axios.get(
                `https://chproxy.iris.dioptra.io?database=${credentials.chproxy_database}&user=${credentials.chproxy_username}&password=${credentials.chproxy_password}&query=${query}`,
            ).then(response => {
                return response.data;
            });
        }).catch((error) => {
            if (error.response.status == 401) {
                localStorage.removeItem('user')
                document.location.href = '/#/login';
            }
            throw new Error("Invalid backend request")
        });
    }
}

export default new ChProxyService();
