from flask import Flask, request

from Movies import Movies

app = Flask(__name__)

@app.route("/search", methods=['GET'])
def hello_world():
    args = request.args 
    print(args.get("q"))
    return "<p>OK, i will search later!</p>"

@app.route("/movies")
def movies():
    return Movies.get_movies()
