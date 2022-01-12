import axios from 'axios';


class MeasurementService {
    getMeasurements(offset, limit, series) {
        var url = series == 'mine'
            ? `${process.env.VUE_APP_BACKEND_URL}/measurements/?offset=${offset}&limit=${limit}`
            : `${process.env.VUE_APP_BACKEND_URL}/measurements/public?tag=collection:${series}&offset=${offset}&limit=${limit}`
        return axios.get(url);
    }

    getMeasurement(uuid, series) {
        return axios.get(`${process.env.VUE_APP_BACKEND_URL}/measurements/${uuid}`);
    }

    postMeasurement(params) {
        return axios.post(process.env.VUE_APP_BACKEND_URL + '/measurements/', params);
    }

    deleteMeasurement(uuid) {
        return axios.delete(process.env.VUE_APP_BACKEND_URL + '/measurements/' + uuid);
    }
}

export default new MeasurementService();
