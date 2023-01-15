from flask import Flask, request, jsonify


from movies import Movies

app = Flask(__name__)

@app.route("/all-movies")
def all_movies():
    result = Movies.all_movies()
    # result = [{'title': 'Four Rooms', 'vote': 6.5, 'overview': "It's Ted the Bellhop's first night on the job...and the hotel's very unusual guests are about to place him in some outrageous predicaments. It seems that this evening's room service is serving up one unbelievable happening after another.", 'vote_count': 539.0, 'imdb': 'tt0113101', 'genres': 'Comedy,Crime'}]
    print(result)
    return jsonify(result)

# @app.route("/top-ten-movies", methods=['GET'])
# def top_ten_movies():
#     # args = request.args
#     return Movies.top_ten_movies(args.get('genre'))