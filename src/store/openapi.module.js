import OpenAPI from '../services/openapi.service';

export const openapi = {
    namespaced: true,
    state: {
        mapping: {}
    },
    mutations: {
        setMapping(state, mapping) {
            state.mapping = mapping;
        },
    },
    actions: {
        loadMapping({ commit }) {
            OpenAPI.getOpenAPI().then(mapping => {
                commit('setMapping', mapping);
            }).catch(error => {
                throw new Error(`Failed to load OpenAPI mapping: ${error.message}`);
            });
        },
    }
};
