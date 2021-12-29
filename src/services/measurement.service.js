import axios from 'axios';
import authHeader from './auth-header';


class MeasurementService {
    getMeasurements(offset, limit) {
        return axios.get(
            `${process.env.VUE_APP_BACKEND_URL}/measurements/?offset=${offset}&limit=${limit}`,
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

    getMeasurement(uuid) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/measurements/' + uuid,
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

    getPublicMeasurements(offset, limit) {
        return axios.get(
            `${process.env.VUE_APP_BACKEND_URL}/measurements/public/?offset=${offset}&limit=${limit}`,
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

    getPublicMeasurement(uuid) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/measurements/public/' + uuid,
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

}

export default new MeasurementService();
