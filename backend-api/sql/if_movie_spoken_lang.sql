select masl.languages as languages from tests.imbd_movies m
left join tests.movies_all_spoken_languages masl on masl.id = m.id
_ID_