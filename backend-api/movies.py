from database import Database


def read_sql_file(sql_filename):
    file = open("sql/"+sql_filename, "r")
    content = file.read()
    file.close()
    return content


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
        cur.execute(read_sql_file('all_movies.sql'))
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
        cur.execute(read_sql_file('top_ten_movies.sql').replace(
            "_MORE_CONDITION_", more_condition))

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
        cur.execute(read_sql_file('all_genres.sql'))

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
        cur.execute(read_sql_file('if_movie_spoken_lang.sql')
                    .replace('_ID_', id_condition))

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
    def if_production_country(self, id):
        id_condition = 'where m.id = ' + id
        db = Database()
        con, cur = db.open_database()
        cur.execute(read_sql_file('if_movie_product_count.sql')
                    .replace('_ID_', id_condition))

        rows = cur.fetchall()
        genres = []
        for row in rows:
            genres.append({'countries': row[0]})
        db.close_database()
        return genres

    @classmethod
    def if_production_company(self, id):
        id_condition = 'where m.id = ' + id
        db = Database()
        con, cur = db.open_database()
        cur.execute(read_sql_file('if_movie_product_comp.sql')
                    .replace('_ID_', id_condition))

        rows = cur.fetchall()
        genres = []
        for row in rows:
            genres.append({'company': row[0]})
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
        sql = read_sql_file('clicked_movie.sql').replace(
            "_ID_CONDITION_", id_condition)
        cur.execute(sql)

        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append(
                {'imdb': row[0],
                 'title': row[1],
                 'overview': row[2],
                 'original_language': row[3],
                 'release_date': row[4],
                 'status': row[5],
                 'runtime': row[6],
                 'vote_average': row[7],
                 'genres': row[8],
                 'id': row[9],
                 'language': row[10]})
        db.close_database()
        return result

    @classmethod
    def movies_based_on_genre(self, genre, pageNum):
        genre_condition = "mag.genre_count like" + "'%" + genre + "%'"
        limit_condition = "limit " + pageNum + ",10"
        db = Database()
        con, cur = db.open_database()

        result = {}
        cur.execute(read_sql_file('movies_based_genre_count.sql')
                    .replace("_GENRE_CONDITION_", genre_condition))
        rows = cur.fetchall()
        result['row_count'] = rows[0][0]

        cur.execute(read_sql_file('movies_based_genre.sql')
                    .replace("_GENRE_CONDITION_", genre_condition)
                    .replace("_LIMIT_CONDITION_", limit_condition))
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
                 'genres': row[9],
                 'count': row[10]})

        db.close_database()
        result['rows'] = row_result
        return result

    @ classmethod
    def movies_based_on_country(self, country, pageNum):
        country_condition = "  mac.countries like" + "'%" + country + "%'"
        limit_condition = "limit " + pageNum + ",10"
        db = Database()
        con, cur = db.open_database()

        result = {}
        cur.execute(read_sql_file('movies_based_country_count.sql')
                    .replace("_COUNTRY_CONDITION_", country_condition))
        rows = cur.fetchall()
        result['row_count'] = rows[0][0]

        cur.execute(read_sql_file('movies_based_country.sql')
                    .replace("_COUNTRY_CONDITION_", country_condition)
                    .replace("_LIMIT_CONDITION_", limit_condition))

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
                 'country': row[9],
                 'count': row[10]})

        db.close_database()
        result['rows'] = row_result
        return result

    @ classmethod
    def movies_based_on_spoken_languages(self, language, pageNum):
        spoken_language_condition = " where masl.languages like " + "'%" + language + "%'"
        limit_condition = "limit " + pageNum + ",10"
        db = Database()
        con, cur = db.open_database()

        result = {}
        cur.execute(read_sql_file('movies_spoken_lang_count.sql')
                    .replace("_SPOKEN_LANGUAGE_CONDITION_", spoken_language_condition))
        rows = cur.fetchall()
        result['row_count'] = rows[0][0]

        cur.execute(read_sql_file('movies_spoken_lang.sql')
                    .replace("_SPOKEN_LANGUAGE_CONDITION_", spoken_language_condition)
                    .replace("_LIMIT_CONDITION_", limit_condition))

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
                 'languages': row[9],
                 'count': row[10]})
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
        limit_condition = "limit " + pageNum + ",10"

        db = Database()
        con, cur = db.open_database()

        result = {}
        cur.execute(read_sql_file('search_result_count.sql')
                    .replace('_TITLE_', title_condition)
                    .replace('_COUNTRY_', country_condition)
                    .replace('_GENRE_', genre_condition)
                    .replace('_LANGUAGE_', lang_condition)
                    .replace('_COMPANY_', company_condition)
                    .replace('_COLLECTION_', collection_condition))
        rows = cur.fetchall()
        result['row_count'] = rows[0][0]

        cur.execute(read_sql_file('search_result.sql')
                    .replace('_TITLE_', title_condition)
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
                 'vote_average': row[15],
                 'vote_count': row[16]})
        db.close_database()
        result['rows'] = row_result
        return result

    @classmethod
    def submit_new_movie_rating(self, rating, id):
        rating_condition = rating
        id_condition = id

        db = Database()
        con, cur = db.open_database()

        cur.execute(read_sql_file('update_movie_rating.sql')
                    .replace("_RATING_", rating_condition)
                    .replace("_ID_", id_condition))

        con.commit()

        cur.execute(read_sql_file('get_the_updated_movie_vote.sql')
                    .replace("_ID_", id_condition))

        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append(
                {'id': row[0], 'vote_count': row[1], 'vote_average': row[2], 'title': row[3]})
        db.close_database()
        return result


if __name__ == "__main__":
    movies = Movies.submit_new_movie_rating('francais', '0')
