import axios from 'axios';
import authHeader from './auth-header';


class MeasurementService {
    getMeasurements() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/measurements/?limit=10',
            { headers: authHeader() }
        ).then(response => {
            return response;
        }).catch(function () {
            localStorage.removeItem('user')
            document.location.href = '/';
        });
    }

    getMeasurement(uuid) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/measurements/' + uuid,
            { headers: authHeader() }
        ).then(response => {
            return response;
        }).catch(function () {
            localStorage.removeItem('user')
            document.location.href = '/';
        });
    }

    postMeasurment(params) {
        return axios
            .post(process.env.VUE_APP_BACKEND_URL + '/measurements/',
                params,
                { headers: authHeader() }
            ).then(response => {
                return response;
            }).catch(function () {
                localStorage.removeItem('user')
                document.location.href = '/';
            });

    }


}

export default new MeasurementService();
