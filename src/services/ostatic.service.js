import axios from 'axios';
import authHeader from './auth-header';


class OstaticService {
    get_token() {
        return axios
            .get(process.env.VUE_APP_OSTATIC_URL + '/token/', { headers: authHeader() })
            .then(response => {
                if (response.data.access_token) {
                    return response.data.access_token;
                }
            })
    }

    download(item) {
        this.get_token().then(token => {
            window.location = process.env.VUE_APP_OSTATIC_URL + '/static/' + item + "?token=" + token;
        });
    }
}

export default new OstaticService();
