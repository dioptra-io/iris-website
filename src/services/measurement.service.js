import axios from 'axios';
import authHeader from './auth-header';


class MeasurementService {
    getMeasurements() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/measurements?limit=10',
            { headers: authHeader() }
        );
    }

    getMeasurement(uuid) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/measurements/' + uuid,
            { headers: authHeader() }
        );
    }

    postMeasurment(params) {
        return axios
            .post(process.env.VUE_APP_BACKEND_URL + '/measurements', params, { headers: authHeader() });
        // .then(response => {
        //     if (response.data.access_token) {
        //         localStorage.setItem('user', JSON.stringify(response.data));
        //     }

        //     return response.data;
        // });
    }


}

export default new MeasurementService();
