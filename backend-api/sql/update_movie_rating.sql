update tests.imbd_movies m 
set m.vote_average = (m.vote_count*m.vote_average + _RATING_) / (m.vote_count + 1), m.vote_count = (m.vote_count + 1)
where m.id = _ID_