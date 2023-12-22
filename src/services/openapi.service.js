import axios from 'axios';


class OpenAPIService {
    getOpenAPI() {
        return axios.get(`${process.env.VUE_APP_BACKEND_URL}/openapi.json`)
            .then((response) => {
                let mapping = {};
                for (const schema in response.data.components.schemas) {
                    const properties = response.data.components.schemas[schema].properties;
                    for (const property in properties) {
                        if (properties[property].title === undefined) { continue }
                        mapping[property] = properties[property].title;
                    }
                }
                return mapping;
            }).catch(() => console.log('openapi request error'))
    }
}

export default new OpenAPIService();
