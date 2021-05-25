import axios from 'axios';
import authHeader from './auth-header';


class MeasurementService {
    getMeasurements(offset, limit) {
        return axios.get(
            `${process.env.VUE_APP_BACKEND_URL}/measurements/?offset=${offset}&limit=${limit}`,
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
                    document.location.href = '/';
                }
                throw new Error("Invalid measurement request")
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
                document.location.href = '/';
            }
            throw new Error("Measurement already finished")
        });
    }

}

export default new MeasurementService();
