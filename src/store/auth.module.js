import AuthService from '../services/auth.service';
import jwt_decode from 'jwt-decode';

// Get the user from the local storage
const user = JSON.parse(localStorage.getItem('user'));

// If the user is logged in, set the state to the user
const initialState = user
    ? { status: { loggedIn: true }, jwt: jwt_decode(user.access_token), user }
    : { status: { loggedIn: false }, jwt: null, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                user => {
                    commit('registerSuccess');
                    return Promise.resolve(user);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.jwt = jwt_decode(user.access_token);
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.jwt = null;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.jwt = null;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
            state.jwt = null;
            state.user = null;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
            state.jwt = null;
            state.user = null;
        }
    }
};
