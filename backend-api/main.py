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