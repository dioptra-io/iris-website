import axios from 'axios';
import router from '../router';
import store from '../store';

axios.interceptors.request.use(
    (config) => {
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            store.dispatch('auth/logout');
            router.push('/');
        }
        return Promise.reject(error);
    }
);


export default axios;
