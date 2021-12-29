import axios from 'axios';


class ChProxyService {
    query(query) {
        var username = 'public';
        var password = 'bam5xahGh4uid2ciethoochu6uu2iewo'
        return axios.get(
            `https://chproxy.iris.dioptra.io?database=iris_dev&user=${username}&password=${password}&query=${query}`,
        ).then(response => {
            return response.data;
        });
    }
}

export default new ChProxyService();
