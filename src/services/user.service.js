import axios from 'axios';
import authHeader from './auth-header';


class UserService {
    getUserMe() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/users/me',
            { headers: authHeader() }
        ).then(response => {
            return response;
        });
    }

    getNonVerifiedUsers(offset, limit) {
        return axios.get(
            `${process.env.VUE_APP_BACKEND_URL}/users?filter_verified=true&offset=${offset}&limit=${limit}`,
            { headers: authHeader() }
        ).then(response => {
            return response;
        }).catch((error) => {
            if (error.response.status == 401) {
                localStorage.removeItem('user')
                document.location.href = '/#/login';
            }
            throw new Error("Invalid user request")
        });
    }

    verifyUser(id) {
        return axios
            .patch(process.env.VUE_APP_BACKEND_URL + `/users/${id}`,
                { is_verified: true },
                { headers: authHeader() }
            ).then(response => {
                return response;
            }).catch((error) => {
                if (error.response.status == 401) {
                    localStorage.removeItem('user')
                    document.location.href = '/#/login';
                }
                throw new Error("Invalid user request")
            });
    }

    enableProbing(id) {
        return axios
            .patch(process.env.VUE_APP_BACKEND_URL + `/users/${id}`,
                { is_verified: true, probing_enabled: true },
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

    deleteUser(id) {
        return axios
            .delete(process.env.VUE_APP_BACKEND_URL + `/users/${id}`, {
                headers: authHeader(),
            })
            .then((response) => {
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

export default new UserService();
