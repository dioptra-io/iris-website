import axios from 'axios';
import authHeader from './auth-header';


class MeasurementService {
    getMeasurements() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/measurements',
            { headers: authHeader() }
        );
    }


}

export default new MeasurementService();
