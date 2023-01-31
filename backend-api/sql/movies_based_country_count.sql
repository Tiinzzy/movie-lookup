select count(*) from tests.imbd_movies m
join tests.movies_all_countries mac on mac.id = m.id
where _COUNTRY_CONDITION_ and m.title <> '0'