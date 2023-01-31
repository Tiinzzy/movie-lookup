select distinct m.id, m.title, m.tagline, m.vote_average, m.vote_count from tests.imbd_movies m
join tests.movies_genre mg on m.id = mg.movie_id
join tests.genres g on g.id = mg.genre_id _MORE_CONDITION_ and m.title <> '0' and m.vote_average <> '0'
order by m.vote_average*m.vote_count desc
limit 10