select g.name, count(*) from tests.movies_genre mg
join tests.genres g on mg.genre_id = g.id
group by g.name
order by count(*) desc