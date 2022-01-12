import axios from 'axios';


class UserService {
    getUserMe() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/users/me', { withCredentials: true },
        );
    }

    getNonVerifiedUsers(offset, limit) {
        return axios.get(
            `${process.env.VUE_APP_BACKEND_URL}/users?filter_verified=true&offset=${offset}&limit=${limit}`,
            { withCredentials: true },
        );
    }

    verifyUser(id) {
        return axios.patch(process.env.VUE_APP_BACKEND_URL + `/users/${id}`,
            { is_verified: true },
            { withCredentials: true }
        );
    }

    enableProbing(id) {
        return axios.patch(process.env.VUE_APP_BACKEND_URL + `/users/${id}`,
            { is_verified: true, probing_enabled: true },
            { withCredentials: true }
        );
    }

    deleteUser(id) {
        return axios.delete(process.env.VUE_APP_BACKEND_URL + `/users/${id}`,
            { withCredentials: true }
        );
    }
}

export default new UserService();
