from Database import Database

class Movies:
    def __init__(self):
        pass

    @classmethod
    def search_movies(self, keywords):
        return ['Toy Story', 'God Father', 'Joker']


    @classmethod
    def get_movies(self):
        db = Database()
        con, cur = db.open_database()
        cur.execute("SELECT m.title, m.vote_average, m.overview FROM tests.imbd_movies m limit 10")
        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append({'title': row[0], 'vote': row[1], 'overview': row[2]})
        db.close_database()        
        return result


if __name__ == "__main__":
    movies = Movies.get_movies()
    print(movies)
