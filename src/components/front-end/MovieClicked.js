import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import LinearProgress from '@mui/material/LinearProgress';

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

class MovieClicked extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_id: props.movie_id.trim(),
            showProgress: false,
            company: null,
            languages: null,
            genre: null,
            language: null,
            countries: null
        };

    }
    async componentDidMount() {

        this.setState({ showProgress: true }, async function () {
            let data = await backend.get_selected_movie(this.state.movie_id);
            if (data[0].language.length > 0) {
                this.setState({
                    language: data[0].language.charAt(0).toUpperCase() + data[0].language.slice(1)
                });
            } else {
                this.setState({ language: null })
            }
            this.setState({
                vote: data[0].vote_average,
                title: data[0].title, status: data[0].status,
                time: data[0].runtime, date: data[0].release_date,
                overview: data[0].overview, lang: data[0].original_language.toUpperCase(),
                imdb: data[0].imdb, genre: data[0].genres, showProgress: false
            });

            let pc = await backend.if_production_country(this.state.movie_id);
            if (pc.length > 0) {
                this.setState({ countries: pc[0].countries.split(','), showProgress: false });
            } else {
                this.setState({ countries: null });
            }

            let sl = await backend.if_spoken_languages(this.state.movie_id);
            if (sl.length > 0) {
                this.setState({ languages: sl[0].languages.split(','), showProgress: false });
            } else {
                this.setState({ languages: null });
            }

            let prc = await backend.if_production_company(this.state.movie_id);
            if (prc.length > 0) {
                this.setState({ company: prc[0].company.split(','), showProgress: false });
            } else {
                this.setState({ company: null });
            }
        });
    }

    render() {
        return (
            <Box>
                {this.state.showProgress ?
                    <Box className="LoadingBarBox"><LinearProgress color="inherit" /></Box> :
                    <Box className="LoadingBarBoxSize"></Box>
                }

                <Box className="SelectedMovieMainBox">
                    <Box className="SelectedMovieBox">
                        <Box className="SelectedMovieTitleBox">
                            <Typography variant="h3" fontWeight="bold" fontSize="35px" >
                                {this.state.title}
                            </Typography>
                            <Box className="SelectedMovieVoteBox">
                                <span id="starSelectedMovie"><StarIcon fontSize="large" /></span>
                                <span>{this.state.vote}/</span><span id="voteSelectedMovie">10</span>
                            </Box>
                        </Box>
                        <Box className="SelectedMovieMiniDataBox">
                            <Typography variant="body2" mt={1} mr={1}>
                                {this.state.date}
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                                |
                            </Typography>
                            <Typography variant="body2" mt={1} mr={1}>
                                {this.state.time} min
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                                |
                            </Typography>
                            {this.state.language !== null &&
                                <Typography variant="body2" mt={1} mr={1}>
                                    <a href={'/language-result?selected_language=' + this.state.language}
                                        className="linkedClass">{this.state.language}
                                    </a>
                                    <span id="langSelectedMovie">
                                        ({this.state.lang})
                                    </span>
                                </Typography>}
                            <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                                |
                            </Typography>
                            <Typography variant="body2" mt={1} mr={1}>
                                {this.state.status}
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                                |
                            </Typography>
                            <Box className="SelectedMovieImdbBox">
                                <a href={'https://www.imdb.com/title/' + this.state.imdb} target="_blank">
                                    <img src="/imdb.png" height="20" alt="#" />
                                </a>
                            </Box>
                        </Box>
                        {this.state.genre !== null && <Box className="SelectedMovieGenreBox">
                            {this.state.genre.split(',').map((e, i) =>
                                <a key={i} href={'/genre-result?selected_genre=' + e} className="GenreLink">
                                    <Typography mr={1} style={{ border: 'solid 1px rgb(87, 86, 86)', padding: 8, borderRadius: 30, fontSize: 12 }}>
                                        {e}
                                    </Typography>
                                </a>
                            )}
                        </Box>}
                        <Typography variant="body1" mt={2}>
                            {this.state.overview}
                        </Typography>
                        {this.state.countries !== null &&
                            <Box className="SelectedMovieDataBox">
                                <Typography style={{ fontWeight: 'bold', marginRight: 6, marginTop: 10 }}>Production Countries:</Typography>
                                {this.state.countries.map((e, i) =>
                                    <Typography fontSize={15} key={i} style={{ marginRight: 4, marginTop: 10 }}>
                                        <a href={'/country-result?selected_country=' + e} className="linkedClass"> {e}</a>
                                    </Typography>)}
                            </Box>}
                        {this.state.languages !== null && <Box className="SelectedMovieDataBox">
                            <Typography style={{ fontWeight: 'bold', marginRight: 6, marginTop: 10 }}>Available in:</Typography>
                            {this.state.languages.map((e, i) =>
                                <Typography fontSize={15} key={i} style={{ marginRight: 4, marginTop: 10 }}>
                                    <a href={'/language-result?selected_language=' + e} className="linkedClass">{e}</a>
                                </Typography>)}
                        </Box>}
                        {this.state.company !== null && <Box className="SelectedMovieDataBox">
                            <Typography style={{ fontWeight: 'bold', marginRight: 6, marginTop: 10 }}>Production Company:</Typography>
                            {this.state.company.map((e, i) =>
                                <Typography fontSize={15} key={i} style={{ marginRight: 8, marginTop: 10 }}>
                                    {e}
                                </Typography>)}
                        </Box>}
                    </Box>
                </Box >
            </Box>
        );
    }
}

export default MovieClicked;