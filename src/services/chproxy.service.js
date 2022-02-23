import axios from 'axios';


const noInterceptorAxios = axios.create();


class ChProxyService {
    forgeQuery(query) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/users/me/services',
        ).then(response => {
            var credentials = response.data;
            return `${credentials.clickhouse.base_url}&user=${credentials.clickhouse.username}&password=${credentials.clickhouse.password}&query=${query}`
        })
    }
    query(query) {
        return this.forgeQuery(query).then(url => {
            return noInterceptorAxios.get(url,);
        });
    }
}

export default new ChProxyService();
