select m.id as id, m.imdb_id as imdb, m.title as title, m.overview as overview, m.original_language as original_language, m.release_date as release_date, m.status as status, m.runtime, m.vote_average as vote_average, masl.languages languages, m.vote_count as count from tests.imbd_movies m
join tests.movies_all_spoken_languages masl on masl.id = m.id
_SPOKEN_LANGUAGE_CONDITION_ and m.title <> '0'
order by m.id
_LIMIT_CONDITION_