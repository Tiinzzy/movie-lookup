from database import Database


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
        cur.execute(''' SELECT m.title, m.vote_average, m.overview, m.vote_count, m.imdb_id, mal.genre_count, m.id FROM tests.imbd_movies m
                        join tests.movies_all_genres mal on mal.title = m.title
                        where m.title <> '0' and m.vote_average <> '0' and m.overview <> '0'
                        order by rand()
                        limit 12;
                        ''')
        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append(
                {'title': row[0], 'vote': row[1], 'overview': row[2], 'vote_count': row[3], 'imdb': row[4], 'genres': row[5], 'movie_id': row[6]})
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
            join tests.genres g on g.id = mg.genre_id _MORE_CONDITION_ and m.title <> '0' and m.vote_average <> '0'
            order by m.vote_average*m.vote_count desc
            limit 10;
        """.replace("_MORE_CONDITION_", more_condition))

        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append(
                {'id': row[0], 'title': row[1], 'tagline': row[2], 'vote_average': row[3], 'vote_count': row[4]})
        db.close_database()
        return result

    @classmethod
    def all_genres(self):
        db = Database()
        con, cur = db.open_database()
        cur.execute('''select g.name, count(*) from tests.movies_genre mg
                        join tests.genres g on mg.genre_id = g.id
                        group by g.name
                        order by count(*) desc;''')

        rows = cur.fetchall()
        genres = []
        for row in rows:
            genres.append({'genre_name': row[0], 'count': row[1]})
        db.close_database()
        return genres

    @classmethod
    def all_release_dates(self):
        db = Database()
        con, cur = db.open_database()
        cur.execute('select distinct release_date from tests.imbd_movies;')

        rows = cur.fetchall()
        genres = []
        for row in rows:
            genres.append({'dates': row[0]})
        db.close_database()
        return genres

    @classmethod
    def all_production_countries(self):
        db = Database()
        con, cur = db.open_database()
        cur.execute('select distinct name from tests.production_countries;')

        rows = cur.fetchall()
        genres = []
        for row in rows:
            genres.append({'countries': row[0]})
        db.close_database()
        return genres

    @classmethod
    def all_spoken_languages(self):
        db = Database()
        con, cur = db.open_database()
        cur.execute('select distinct language from tests.spoken_languages;')

        rows = cur.fetchall()
        genres = []
        for row in rows:
            genres.append({'languages': row[0]})
        db.close_database()
        return genres

    @classmethod
    def if_spoken_languages(self, id):
        id_condition = 'where m.id = ' + id
        db = Database()
        con, cur = db.open_database()
        cur.execute("""select masl.languages as languages from tests.imbd_movies m
                        join tests.movies_all_spoken_languages masl on masl.id = m.id
                        _ID_
                        """.replace('_ID_', id_condition))

        rows = cur.fetchall()
        genres = []
        for row in rows:
            genres.append({'languages': row[0]})
        db.close_database()
        return genres

    @classmethod
    def all_production_companies(self):
        db = Database()
        con, cur = db.open_database()
        cur.execute('select distinct name from tests.production_companies;')

        rows = cur.fetchall()
        genres = []
        for row in rows:
            genres.append({'companies': row[0]})
        db.close_database()
        return genres

    @classmethod
    def if_production_company(self, id):
        id_condition = 'where m.id = ' + id
        db = Database()
        con, cur = db.open_database()
        cur.execute("""select mac.countries as country from tests.imbd_movies m
                join tests.movies_all_countries mac on mac.id = m.id
                _ID_
                """.replace('_ID_', id_condition))

        rows = cur.fetchall()
        genres = []
        for row in rows:
            genres.append({'countries': row[0]})
        db.close_database()
        return genres

    @classmethod
    def all_collections(self):
        db = Database()
        con, cur = db.open_database()
        cur.execute('select distinct name from tests.collections;')

        rows = cur.fetchall()
        genres = []
        for row in rows:
            genres.append({'collections': row[0]})
        db.close_database()
        return genres

    @classmethod
    def selected_movie(self, id):
        id_condition = " m.id =" + id
        db = Database()
        con, cur = db.open_database()
        cur.execute("""select imdb, title, overview, original_language, release_date, status, runtime, vote_average, GROUP_CONCAT(genres SEPARATOR ', ') as genres, id, language from (
                select m.imdb_id as imdb, m.title as title, m.overview as overview, m.original_language as original_language, m.release_date as release_date, m.status as status, m.runtime, m.vote_average as vote_average, g.name genres, m.id as id, sl.language as language from tests.imbd_movies m
                join tests.movies_genre mg on m.id = mg.movie_id
                join tests.genres g on g.id = mg.genre_id
                join tests.spoken_languages sl on sl.initial = m.original_language
                where _ID_CONDITION_
                ) as t2
            group by imdb, title, overview, original_language, release_date, status, runtime, vote_average, id, language;
                """.replace("_ID_CONDITION_", id_condition))

        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append(
                {'imdb': row[0], 'title': row[1], 'overview': row[2], 'original_language': row[3], 'release_date': row[4], 'status': row[5], 'runtime': row[6], 'vote_average': row[7], 'genres': row[8].split(','), 'id': row[9], 'language': row[10]})
        db.close_database()
        return result

    @classmethod
    def movies_based_on_genre(self, genre, pageNum):
        genre_condition = "mag.genre_count like" + "'%" + genre + "%'"
        limit_condition = "limit " + pageNum + ",6"
        db = Database()
        con, cur = db.open_database()

        result = {}
        cur.execute("""select count(*) from tests.imbd_movies m
                        join tests.movies_all_genres mag on mag.id = m.id
                        where _GENRE_CONDITION_ and m.title <> '0'
                """.replace("_GENRE_CONDITION_", genre_condition))
        rows = cur.fetchall()
        result['row_count'] = rows[0][0]

        cur.execute("""select m.id as id, m.imdb_id as imdb, m.title as title, m.overview as overview, m.original_language as original_language, m.release_date as release_date, m.status as status, m.runtime, m.vote_average as vote_average, mag.genre_count as genre from tests.imbd_movies m
                        join tests.movies_all_genres mag on mag.id = m.id
                        where _GENRE_CONDITION_ and m.title <> '0'
                        order by m.id
                        _LIMIT_CONDITION_
                """.replace("_GENRE_CONDITION_", genre_condition).replace("_LIMIT_CONDITION_", limit_condition))
        rows = cur.fetchall()
        row_result = []
        for row in rows:
            row_result.append(
                {'id': row[0],
                 'imdb': row[1],
                 'title': row[2],
                 'overview': row[3],
                 'original_language': row[4],
                 'release_date': row[5],
                 'status': row[6],
                 'runtime': row[7],
                 'vote_average': row[8],
                 'genres': row[9]})

        db.close_database()
        result['rows'] = row_result
        return result

    @ classmethod
    def movies_based_on_country(self, country, pageNum):
        country_condition = "  mac.countries like" + "'%" + country + "%'"
        limit_condition = "limit " + pageNum + ",6"
        db = Database()
        con, cur = db.open_database()

        result = {}
        cur.execute("""select count(*) from tests.imbd_movies m
                        join tests.movies_all_countries mac on mac.id = m.id
                        where _COUNTRY_CONDITION_ and m.title <> '0'
                """.replace("_COUNTRY_CONDITION_", country_condition))
        rows = cur.fetchall()
        result['row_count'] = rows[0][0]

        cur.execute("""select m.id as id, m.imdb_id as imdb, m.title as title, m.overview as overview, m.original_language as original_language, m.release_date as release_date, m.status as status, m.runtime, m.vote_average as vote_average, mac.countries as country from tests.imbd_movies m
                        join tests.movies_all_countries mac on mac.id = m.id
                        where _COUNTRY_CONDITION_ and m.title <> '0'
                        order by m.id
                        _LIMIT_CONDITION_
                """.replace("_COUNTRY_CONDITION_", country_condition).replace("_LIMIT_CONDITION_", limit_condition))

        rows = cur.fetchall()
        row_result = []
        for row in rows:
            row_result.append(
                {'id': row[0],
                 'imdb': row[1],
                 'title': row[2],
                 'overview': row[3],
                 'original_language': row[4],
                 'release_date': row[5],
                 'status': row[6],
                 'runtime': row[7],
                 'vote_average': row[8],
                 'country': row[9]})

        db.close_database()
        result['rows'] = row_result
        return result

    @ classmethod
    def movies_based_on_spoken_languages(self, language, pageNum):
        spoken_language_condition = " where masl.languages like " + "'%" + language + "%'"
        limit_condition = "limit " + pageNum + ",6"
        db = Database()
        con, cur = db.open_database()

        result = {}
        cur.execute(""" select count(*) from tests.imbd_movies m
                        join tests.movies_all_spoken_languages masl on masl.id = m.id
                        _SPOKEN_LANGUAGE_CONDITION_ and m.title <> '0'
                        """.replace("_SPOKEN_LANGUAGE_CONDITION_", spoken_language_condition))
        rows = cur.fetchall()
        result['row_count'] = rows[0][0]

        cur.execute(""" select m.id as id, m.imdb_id as imdb, m.title as title, m.overview as overview, m.original_language as original_language, m.release_date as release_date, m.status as status, m.runtime, m.vote_average as vote_average, masl.languages languages from tests.imbd_movies m
                        join tests.movies_all_spoken_languages masl on masl.id = m.id
                        _SPOKEN_LANGUAGE_CONDITION_ and m.title <> '0'
                        order by m.id
                        _LIMIT_CONDITION_
                        """.replace("_SPOKEN_LANGUAGE_CONDITION_", spoken_language_condition).replace("_LIMIT_CONDITION_", limit_condition))

        rows = cur.fetchall()
        row_result = []
        for row in rows:
            row_result.append(
                {'id': row[0],
                 'imdb': row[1],
                 'title': row[2],
                 'overview': row[3],
                 'original_language': row[4],
                 'release_date': row[5],
                 'status': row[6],
                 'runtime': row[7],
                 'vote_average': row[8],
                 'languages': row[9]})
        db.close_database()
        result['rows'] = row_result
        return result

    @ classmethod
    def search_result(self, search, pageNum):
        title_condition = " where m.title like " + "'%" + search + "%'"
        country_condition = " and pc.name like " + "'%" + search + "%'"
        genre_condition = " and g.name like " + "'%" + search + "%'"
        lang_condition = " and sl.language like " + "'%" + search + "%'"
        company_condition = " and prc.name like " + "'%" + search + "%'"
        collection_condition = " and c.name like " + "'%" + search + "%'"
        limit_condition = "limit " + pageNum + ",6"

        db = Database()
        con, cur = db.open_database()

        result = {}
        cur.execute("""
        select count(*) from (
                    select m.id AS id
                    from tests.imbd_movies m 
                    _TITLE_ 
                    union
                    select m.id AS id
                    from tests.imbd_movies m
                    join tests.movie_production_countries mpc on m.id = mpc.movie_id
                    join tests.production_countries pc on pc.initials = mpc.country_initial _COUNTRY_
                    union
                    select m.id AS id
                    from tests.imbd_movies m
                    join tests.movies_genre mg on m.id = mg.movie_id
                    join tests.genres g on g.id = mg.genre_id _GENRE_
                    union
                    select m.id AS id
                    from tests.imbd_movies m
                    join tests.movies_spoken_languages msl on m.id = msl.movie_id
                    join tests.spoken_languages sl on sl.initial = msl.language_initial _LANGUAGE_
                    union
                    select m.id AS id
                    from tests.imbd_movies m
                    join tests.movies_production_companies mprc on m.id = mprc.movie_id
                    join tests.production_companies prc on prc.id = mprc.production_company_id _COMPANY_
                    union
                    select m.id as id
                    from tests.imbd_movies m 
                    join tests.movie_collections mc on mc.movie_id = m.id
                    join tests.collections c on mc.collection_id = c.id _COLLECTION_
                    order by id 
                        ) all_ids
                """.replace('_TITLE_', title_condition)
                    .replace('_COUNTRY_', country_condition)
                    .replace('_GENRE_', genre_condition)
                    .replace('_LANGUAGE_', lang_condition)
                    .replace('_COMPANY_', company_condition)
                    .replace('_COLLECTION_', collection_condition))
        rows = cur.fetchall()
        result['row_count'] = rows[0][0]

        cur.execute("""
        select * from (
                    select m.id AS id
                    from tests.imbd_movies m 
                    _TITLE_ 
                    union
                    select m.id AS id
                    from tests.imbd_movies m
                    join tests.movie_production_countries mpc on m.id = mpc.movie_id
                    join tests.production_countries pc on pc.initials = mpc.country_initial _COUNTRY_
                    union
                    select m.id AS id
                    from tests.imbd_movies m
                    join tests.movies_genre mg on m.id = mg.movie_id
                    join tests.genres g on g.id = mg.genre_id _GENRE_
                    union
                    select m.id AS id
                    from tests.imbd_movies m
                    join tests.movies_spoken_languages msl on m.id = msl.movie_id
                    join tests.spoken_languages sl on sl.initial = msl.language_initial _LANGUAGE_
                    union
                    select m.id AS id
                    from tests.imbd_movies m
                    join tests.movies_production_companies mprc on m.id = mprc.movie_id
                    join tests.production_companies prc on prc.id = mprc.production_company_id _COMPANY_
                    union
                    select m.id as id
                    from tests.imbd_movies m 
                    join tests.movie_collections mc on mc.movie_id = m.id
                    join tests.collections c on mc.collection_id = c.id _COLLECTION_
                    order by id 
                    _LIMIT_
                        ) all_ids
                        join tests.imbd_movies m 
                        on all_ids.id= m.id 
                """.replace('_TITLE_', title_condition)
                    .replace('_COUNTRY_', country_condition)
                    .replace('_GENRE_', genre_condition)
                    .replace('_LANGUAGE_', lang_condition)
                    .replace('_COMPANY_', company_condition)
                    .replace('_COLLECTION_', collection_condition)
                    .replace('_LIMIT_', limit_condition))

        rows = cur.fetchall()
        row_result = []
        for row in rows:
            row_result.append(
                {'id': row[1],
                 'imdb': row[2],
                 'title': row[4],
                 'overview': row[6],
                 'original_language': row[5],
                 'release_date': row[8],
                 'status': row[9],
                 'runtime': row[12],
                 'vote_average': row[15]})
        db.close_database()
        result['rows'] = row_result
        return result


if __name__ == "__main__":
    movies = Movies.movies_based_on_spoken_languages('francais', '0')
    print(movies)
