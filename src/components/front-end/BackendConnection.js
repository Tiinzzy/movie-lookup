import axios from 'axios';

class BackEndConnectionImpl {
    async connect(query) {
        return axios.get('/connected-to-backend', { params: query })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return false;
            })
    }

}

export default class BackEndConnection {
    static #object = null;

    static INSTANCE() {
        if (BackEndConnection.#object === null) {
            BackEndConnection.#object = new BackEndConnectionImpl();
        }
        return BackEndConnection.#object;
    }

}
