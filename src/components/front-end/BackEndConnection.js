import axios from 'axios';

class BackEndConnectionImpl {
    async get_movies() {
        return axios.get('/all-movies', {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_top_movies(genre) {
        // return axios.get('/top-ten-movies?genre=' + genre, {})
        //     .then(function (response) {
        //         console.log(response.data);
        //         return response.data;
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         return false;
        //     })
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
