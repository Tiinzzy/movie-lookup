select count(*) from tests.imbd_movies m
join tests.movies_all_spoken_languages masl on masl.id = m.id
_SPOKEN_LANGUAGE_CONDITION_ and m.title <> '0'