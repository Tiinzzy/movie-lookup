select mapc.companies as companies from tests.imbd_movies m
left join tests.movies_all_production_companies mapc on mapc.id = m.id
_ID_