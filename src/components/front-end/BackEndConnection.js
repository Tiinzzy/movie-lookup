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
        return axios.get('/top-ten-movies?genre=' + genre, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_all_movie_genres() {
        return axios.get('/all_movie_genres', {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_release_dates() {
        return axios.get('/all_movies_release_dates', {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_production_countries() {
        return axios.get('/all_movies_production_countries', {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async if_production_country(id) {
        return axios.get('/if_movie_has_production_country?id=' + id, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_spoken_languages() {
        return axios.get('/all_movies_all_spoken_languages', {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async if_spoken_languages(id) {
        return axios.get('/if_movie_has_languages?id=' + id, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async if_production_company(id) {
        return axios.get('/if_movie_has_production_company?id=' + id, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_production_companies() {
        return axios.get('/all_movies_all_production_companies', {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_collections() {
        return axios.get('/all_movies_collections', {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_selected_movie(id) {
        return axios.get('/get_selected_movie?id=' + id, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_movies_based_on_genres(genre, pageNum) {
        return axios.get('/get_movies_based_on_genre?genre=' + genre + '&pageNum=' + pageNum, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_movies_based_on_countries(country, pageNum) {
        return axios('/get_movies_based_on_country?country=' + country + '&pageNum=' + pageNum, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_movies_based_on_spoken_languages(language, pageNum) {
        return axios('/get_movies_based_on_spoken_languages?language=' + language + '&pageNum=' + pageNum, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_search_results(search, pageNum) {
        return axios('/get_search_result?search=' + search + '&pageNum=' + pageNum, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
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
