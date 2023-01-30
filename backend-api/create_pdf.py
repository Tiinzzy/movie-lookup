import pdfkit
from movies import Movies


def create_pdf_for_download(id):
    movie_data = Movies.selected_movie(id)
    movie_data = movie_data[0]

    language = movie_data['language']
    release_date = movie_data['release_date']
    title = movie_data['title']
    overview = movie_data['overview']
    original_language = movie_data['original_language']
    status = movie_data['status']
    runtime = movie_data['runtime']
    vote_average = movie_data['vote_average']
    genres = movie_data['genres']

    # /////////////////////////////////////////////////////////////////////////////////////////////////

    production_country_data = Movies.if_production_country(id)
    production_country_data = production_country_data[0]

    countries = production_country_data['countries']

    # /////////////////////////////////////////////////////////////////////////////////////////////////

    spoken_language_data = Movies.if_spoken_languages(id)
    spoken_language_data = spoken_language_data[0]

    spoken_languages = spoken_language_data['languages']

    # /////////////////////////////////////////////////////////////////////////////////////////////////

    # production_company_data = Movies.if_production_company('38329')
    # production_company_data = production_company_data[0]

    # company = production_company_data['company']

    # /////////////////////////////////////////////////////////////////////////////////////////////////

    file = open('template.html', 'r')
    html_file = file.read()

    html_file = html_file.format(language=language, release_date=release_date,
                                 title=title, overview=overview, original_language=original_language,
                                 status=status, runtime=runtime, vote_average=vote_average, spoken_languages=spoken_languages, countries=countries,
                                 genres=genres)

    return pdfkit.from_string(html_file, "/home/tina/Documents/projects/movie-lookup/backend-api/pdf-files/"+title + '-download.pdf')


create_pdf_for_download('11549')
