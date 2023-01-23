from flask import Flask, request, jsonify
from movies import Movies

import simple_cache

app = Flask(__name__)


@app.route("/all-movies")
def all_movies():
    key = "_all-movies"
    result = simple_cache.get(key)
    if result is None:
        result = jsonify(Movies.all_movies())
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/top-ten-movies", methods=['GET'])
def top_ten_movies():
    args = request.args
    key = "_top-ten-movies." + args.get('genre')
    result = simple_cache.get(key)
    if result is None:
        result = Movies.top_ten_movies(args.get('genre'))
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/all_movie_genres")
def all_movie_genres():
    key = "_all_movie_genres"
    result = simple_cache.get(key)
    if result is None:
        result = jsonify(Movies.all_genres())
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/all_movies_release_dates")
def all_movies_release_dates():
    key = "_all_movies_release_dates"
    result = simple_cache.get(key)
    if result is None:
        result = jsonify(Movies.all_release_dates())
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/all_movies_production_countries")
def all_movies_production_countries():
    key = "_all_movies_production_countries"
    result = simple_cache.get(key)
    if result is None:
        result = jsonify(Movies.all_production_countries())
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/all_movies_all_spoken_languages")
def all_movies_all_spoken_languages():
    key = "_all_movies_all_spoken_languages"
    result = simple_cache.get(key)
    if result is None:
        result = jsonify(Movies.all_spoken_languages())
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/all_movies_all_production_companies")
def all_movies_all_production_companies():
    key = "_all_movies_all_production_companies"
    result = simple_cache.get(key)
    if result is None:
        result = jsonify(Movies.all_production_companies())
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/all_movies_collections")
def all_movies_collections():
    key = "_all_movies_collections"
    result = simple_cache.get(key)
    if result is None:
        result = jsonify(Movies.all_collections())
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/get_selected_movie", methods=['GET'])
def selected_movie_clicked():
    args = request.args
    key = "_get_selected_movie" + args.get('id')
    result = simple_cache.get(key)
    if result is None:
        result = Movies.selected_movie(args.get('id'))
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/get_movies_based_on_genre", methods=['GET'])
def all_movies_based_on_genre():
    args = request.args
    key = "_get_movies_based_on_genre" + \
        args.get('genre') + args.get('pageNum')
    result = simple_cache.get(key)
    if result is None:
        result = Movies.movies_based_on_genre(
            args.get('genre'), args.get('pageNum'))
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/get_movies_based_on_country", methods=['GET'])
def all_movies_based_on_country():
    args = request.args
    key = "_get_movies_based_on_country" + \
        args.get('country') + args.get('pageNum')
    result = simple_cache.get(key)
    if result is None:
        result = Movies.movies_based_on_country(
            args.get('country'), args.get('pageNum'))
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/get_movies_based_on_spoken_languages", methods=['GET'])
def all_movies_based_on_spoken_languages():
    args = request.args
    key = "_get_movies_based_on_spoken_languages" + \
        args.get('language') + args.get('pageNum')
    result = simple_cache.get(key)
    if result is None:
        result = Movies.movies_based_on_spoken_languages(
            args.get('language'), args.get('pageNum'))
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/get_search_result", methods=['GET'])
def get_all_search_results():
    args = request.args
    key = "_get_search_result" + args.get('search') + args.get('pageNum')
    result = simple_cache.get(key)
    if result is None:
        result = Movies.search_result(args.get('search'), args.get('pageNum'))
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/if_movie_has_production_country", methods=['GET'])
def if_movie_has_production_country():
    args = request.args
    key = "_if_movie_has_production_country" + args.get('id')
    result = simple_cache.get(key)
    if result is None:
        result = Movies.if_production_country(args.get('id'))
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/if_movie_has_languages", methods=['GET'])
def if_movie_has_languages():
    args = request.args
    key = "_if_movie_has_languages" + args.get('id')
    result = simple_cache.get(key)
    if result is None:
        result = Movies.if_spoken_languages(args.get('id'))
        simple_cache.put(key, result)
        return result
    else:
        return result


@app.route("/if_movie_has_production_company", methods=['GET'])
def if_movie_has_company():
    args = request.args
    key = "_if_movie_has_production_company" + args.get('id')
    result = simple_cache.get(key)
    if result is None:
        result = Movies.if_production_company(args.get('id'))
        simple_cache.put(key, result)
        return result
    else:
        return result
