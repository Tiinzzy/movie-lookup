select m.id as id, m.imdb_id as imdb, m.title as title, m.overview as overview, m.original_language as original_language, m.release_date as release_date, m.status as status, m.runtime, m.vote_average as vote_average, mag.genre_count as genre, m.vote_count as count from tests.imbd_movies m
join tests.movies_all_genres mag on mag.id = m.id
where _GENRE_CONDITION_ and m.title <> '0'
order by m.id
_LIMIT_CONDITION_