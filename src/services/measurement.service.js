import axios from 'axios';
import authHeader from './auth-header';


class MeasurementService {
    getMeasurements(offset, limit, visibility) {
        // TODO: Use tags in next version of Iris for different collections
        var url = visibility == 'own'
            ? `${process.env.VUE_APP_BACKEND_URL}/measurements/?offset=${offset}&limit=${limit}`
            : `${process.env.VUE_APP_BACKEND_URL}/measurements/public/?offset=${offset}&limit=${limit}`
        return axios.get(
            url,
            { headers: authHeader() }
        ).then(response => {
            return response;
        }).catch((error) => {
            if (error.response.status == 401) {
                localStorage.removeItem('user')
                document.location.href = '/#/login';
            }
            throw new Error("Invalid backend request")
        });
    }

    getMeasurement(uuid, visibility) {
        // TODO: Use tags in next version of Iris for different collections
        var url = visibility == 'own'
            ? `${process.env.VUE_APP_BACKEND_URL}/measurements/${uuid}`
            : `${process.env.VUE_APP_BACKEND_URL}/measurements/public/${uuid}`
        return axios.get(
            url,
            { headers: authHeader() }
        ).then(response => {
            return response;
        }).catch((error) => {
            if (error.response.status == 401) {
                localStorage.removeItem('user')
                document.location.href = '/#/login';
            }
            throw new Error("Invalid backend request")
        });
    }

    postMeasurement(params) {
        return axios
            .post(process.env.VUE_APP_BACKEND_URL + '/measurements/',
                params,
                { headers: authHeader() }
            ).then(response => {
                return response;
            }).catch((error) => {
                if (error.response.status == 401) {
                    localStorage.removeItem('user')
                    document.location.href = '/#/login';
                }
                throw new Error("Invalid backend request")
            });
    }

    deleteMeasurement(uuid) {
        return axios.delete(
            process.env.VUE_APP_BACKEND_URL + '/measurements/' + uuid,
            { headers: authHeader() }
        ).then(response => {
            return response;
        }).catch((error) => {
            if (error.response.status == 401) {
                localStorage.removeItem('user')
                document.location.href = '/#/login';
            }
            throw new Error("Measurement already finished")
        });
    }
}

export default new MeasurementService();
