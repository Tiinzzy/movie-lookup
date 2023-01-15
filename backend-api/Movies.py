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
        cur.execute(''' SELECT m.title, m.vote_average, m.overview, m.vote_count, m.imdb_id, mal.genre_count FROM tests.imbd_movies m 
                        join tests.movies_all_genres mal on mal.title = m.title
                        ORDER BY RAND() limit 12;
                        ''')
        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append(
                {'title': row[0], 'vote': row[1], 'overview': row[2], 'vote_count': row[3], 'imdb': row[4], 'genres': row[5]})
        db.close_database()
        return result


if __name__ == "__main__":
    movies = Movies.get_movies()
    print(movies)
