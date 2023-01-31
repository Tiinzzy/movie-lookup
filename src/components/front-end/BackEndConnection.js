import axios from 'axios';

class BackEndConnectionImpl {
    async get_movies(callback) {
        return axios.get('/api/all-movies', {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_top_movies(genre, callback) {
        return axios.get('/api/top-ten-movies?genre=' + genre, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_all_movie_genres(callback) {
        return axios.get('/api/all_movie_genres', {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_release_dates() {
        return axios.get('/api/all_movies_release_dates', {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_production_countries(callback) {
        return axios.get('/api/all_movies_production_countries', {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async if_production_country(id, callback) {
        return axios.get('/api/if_movie_has_production_country?id=' + id, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_spoken_languages(callback) {
        return axios.get('/api/all_movies_all_spoken_languages', {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async if_spoken_languages(id, callback) {
        return axios.get('/api/if_movie_has_languages?id=' + id, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async if_production_company(id, callback) {
        return axios.get('/api/if_movie_has_production_company?id=' + id, {})
            .then(function (response) {
                if (response.data[0].company === null) {
                    return false
                } else {
                    if (callback) {
                        callback(response.data);
                    }
                    return response.data;
                }
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_production_companies() {
        return axios.get('/api/all_movies_all_production_companies', {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_collections() {
        return axios.get('/api/all_movies_collections', {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_selected_movie(id, callback) {
        return axios.get('/api/get_selected_movie?id=' + id, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_movies_based_on_genres(genre, pageNum, callback) {
        return axios.get('/api/get_movies_based_on_genre?genre=' + genre + '&pageNum=' + pageNum, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_movies_based_on_countries(country, pageNum, callback) {
        return axios('/api/get_movies_based_on_country?country=' + country + '&pageNum=' + pageNum, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_movies_based_on_spoken_languages(language, pageNum, callback) {
        return axios('/api/get_movies_based_on_spoken_languages?language=' + language + '&pageNum=' + pageNum, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_search_results(search, pageNum, callback) {
        return axios('/api/get_search_result?search=' + search + '&pageNum=' + pageNum, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async submit_rating(rating, id, callback) {
        return axios('/api/get-new-movie-rating?rating=' + rating + '&id=' + id, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
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
