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

