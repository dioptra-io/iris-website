import axios from 'axios';


const noInterceptorAxios = axios.create();


class ChProxyService {
    query(query) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/users/me/services',
        ).then(response => {
            var credentials = response.data;
            return noInterceptorAxios.get(
                `${credentials.chproxy_url}&user=${credentials.chproxy_username}&password=${credentials.chproxy_password}&query=${query}`,
            );
        });
    }
}

export default new ChProxyService();
