select * from (
    select m.id AS id
    from tests.imbd_movies m 
    _TITLE_ 
    union
    select m.id AS id
    from tests.imbd_movies m
    join tests.movie_production_countries mpc on m.id = mpc.movie_id
    join tests.production_countries pc on pc.initials = mpc.country_initial _COUNTRY_
    union
    select m.id AS id
    from tests.imbd_movies m
    join tests.movies_genre mg on m.id = mg.movie_id
    join tests.genres g on g.id = mg.genre_id _GENRE_
    union
    select m.id AS id
    from tests.imbd_movies m
    join tests.movies_spoken_languages msl on m.id = msl.movie_id
    join tests.spoken_languages sl on sl.initial = msl.language_initial _LANGUAGE_
    union
    select m.id AS id
    from tests.imbd_movies m
    join tests.movies_production_companies mprc on m.id = mprc.movie_id
    join tests.production_companies prc on prc.id = mprc.production_company_id _COMPANY_
    union
    select m.id as id
    from tests.imbd_movies m 
    join tests.movie_collections mc on mc.movie_id = m.id
    join tests.collections c on mc.collection_id = c.id _COLLECTION_
    order by id 
    _LIMIT_
) all_ids
join tests.imbd_movies m 
on all_ids.id= m.id 