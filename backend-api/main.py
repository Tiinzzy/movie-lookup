from flask import Flask, request, jsonify


from movies import Movies

app = Flask(__name__)


@app.route("/all-movies")
def all_movies():
    result = Movies.all_movies()
    return jsonify(result)


@app.route("/top-ten-movies", methods=['GET'])
def top_ten_movies():
    args = request.args
    print(args)
    return Movies.top_ten_movies(args.get('genre'))


@app.route("/all_movie_genres")
def all_movie_genres():
    data = Movies.all_genres()
    return jsonify(data)


@app.route("/all_movies_release_dates")
def all_movies_release_dates():
    data = Movies.all_release_dates()
    return jsonify(data)


@app.route("/all_movies_production_countries")
def all_movies_production_countries():
    data = Movies.all_production_countries()
    return jsonify(data)


@app.route("/all_movies_all_spoken_languages")
def all_movies_all_spoken_languages():
    data = Movies.all_spoken_languages()
    return jsonify(data)


@app.route("/all_movies_all_production_companies")
def all_movies_all_production_companies():
    data = Movies.all_production_companies()
    return jsonify(data)


@app.route("/all_movies_collections")
def all_movies_collections():
    data = Movies.all_collections()
    return jsonify(data)


@app.route("/get_selected_movie", methods=['GET'])
def selected_movie_clicked():
    args = request.args
    data = Movies.selected_movie(args.get('id'))
    return jsonify(data)


@app.route("/get_movies_based_on_genre", methods=['GET'])
def all_movies_based_on_genre():
    args = request.args
    data = Movies.movies_based_on_genre(args.get('genre'), args.get('pageNum'))
    return jsonify(data)


@app.route("/get_movies_based_on_country", methods=['GET'])
def all_movies_based_on_country():
    args = request.args
    data = Movies.movies_based_on_country(
        args.get('country'), args.get('pageNum'))
    return jsonify(data)


@app.route("/get_movies_based_on_spoken_languages", methods=['GET'])
def all_movies_based_on_spoken_languages():
    args = request.args
    data = Movies.movies_based_on_spoken_languages(
        args.get('language'), args.get('pageNum'))
    return jsonify(data)


@app.route("/get_search_result", methods=['GET'])
def get_all_search_results():
    args = request.args
    data = Movies.search_result(args.get('search'), args.get('pageNum'))
    return jsonify(data)


@app.route("/if_movie_has_production_country", methods=['GET'])
def if_movie_has_production_country():
    args = request.args
    data = Movies.if_production_company(args.get('id'))
    return jsonify(data)


@app.route("/if_movie_has_languages", methods=['GET'])
def if_movie_has_languages():
    args = request.args
    data = Movies.if_spoken_languages(args.get('id'))
    return jsonify(data)
