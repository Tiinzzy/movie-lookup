select imdb, title, overview, original_language, release_date, status, runtime, vote_average, GROUP_CONCAT(genres SEPARATOR ', ') as genres, id, language from (
    select m.imdb_id as imdb, m.title as title, m.overview as overview, m.original_language as original_language, m.release_date as release_date, m.status as status, m.runtime, m.vote_average as vote_average, g.name genres, m.id as id, sl.language as language from tests.imbd_movies m
    left join tests.movies_genre mg on m.id = mg.movie_id
    left join tests.genres g on g.id = mg.genre_id
    left join tests.spoken_languages sl on sl.initial = m.original_language
    where _ID_CONDITION_
) as t2
group by imdb, title, overview, original_language, release_date, status, runtime, vote_average, id, language;