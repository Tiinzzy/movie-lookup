select count(*) from tests.imbd_movies m
join tests.movies_all_genres mag on mag.id = m.id
where _GENRE_CONDITION_ and m.title <> '0'