select mac.countries as country from tests.imbd_movies m
left join tests.movies_all_countries mac on mac.id = m.id
_ID_