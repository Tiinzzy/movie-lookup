from database import Database

import time

class Movies:
    def __init__(self):
        pass

    @classmethod
    def search_movies(self, keywords):
        return ['Toy Story', 'God Father', 'Joker']

    @classmethod
    def all_movies(self):
        db = Database()
        con, cur = db.open_database()
        cur.execute(''' SELECT m.title, m.vote_average, m.overview, m.vote_count, m.imdb_id, mal.genre_count FROM tests.imbd_movies m 
                        join tests.movies_all_genres mal on mal.title = m.title
                        order by rand()
                        limit 5;
                        ''')
        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append(
                {'title': row[0], 'vote': row[1], 'overview': row[2], 'vote_count': row[3], 'imdb': row[4], 'genres': row[5]})
        db.close_database()
        return result

    @classmethod
    def top_ten_movies(self, genre):
        more_condition = "" if genre is None else " and g.name like '%" + genre + "%' "
        db = Database()
        con, cur = db.open_database()
        cur.execute("""
        select distinct m.id, m.title, m.tagline, m.vote_average, m.vote_count from tests.imbd_movies m
            join tests.movies_genre mg on m.id = mg.movie_id
            join tests.genres g on g.id = mg.genre_id _MORE_CONDITION_
            order by m.vote_average*m.vote_count desc
            limit 10;
        """.replace("_MORE_CONDITION_", more_condition))

        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append(
                {'title': row[0], 'tagline': row[1]})
        db.close_database()
        return result


if __name__ == "__main__":
    for i in range(20):
        movies = Movies.all_movies()
        print(movies)
        print("\n>>>>>> 0", i)
        time.sleep(1)
