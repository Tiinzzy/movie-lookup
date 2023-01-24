import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import LinearProgress from '@mui/material/LinearProgress';

import BackEndConnection from './BackEndConnection';
import Advertisement from './Advertisement';
import RateMovie from "./RateMovie";

import { LISTENERS } from "./messaging";

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

    componentDidMount() {

        LISTENERS.getUpdateVotes().addEventListener('movie-voting-has-been-updated',
            (e) => {
                if (e.detail.id === this.state.movie_id) {
                    this.setState({ vote: e.detail.vote });
                }
            }
            , false);

        this.setState({ showProgress: true }, async function () {
            backend.get_selected_movie(this.state.movie_id, (data) => {
                let that = this;
                if (data[0].language.length > 0) {
                    that.setState({
                        language: data[0].language.charAt(0).toUpperCase() + data[0].language.slice(1)
                    });
                } else {
                    that.setState({ language: null })
                }
                that.setState({
                    vote: data[0].vote_average,
                    title: data[0].title, status: data[0].status,
                    time: data[0].runtime, date: data[0].release_date,
                    overview: data[0].overview, lang: data[0].original_language.toUpperCase(),
                    imdb: data[0].imdb, genre: data[0].genres, showProgress: false
                });
            });


            backend.if_production_country(this.state.movie_id, (data) => {
                let that = this;
                if (data.length > 0) {
                    that.setState({ countries: data[0].countries.split(','), showProgress: false });
                } else {
                    that.setState({ countries: null });
                }
            });


            backend.if_spoken_languages(this.state.movie_id, (data) => {
                let that = this;
                if (data.length > 0) {
                    that.setState({ languages: data[0].languages.split(','), showProgress: false });
                } else {
                    that.setState({ languages: null });
                }
            });


            backend.if_production_company(this.state.movie_id, (data) => {
                let that = this;
                if (data.length > 0) {
                    that.setState({ company: data[0].company.split(','), showProgress: false });
                } else {
                    that.setState({ company: null });
                }
            });
        });
    }

    render() {
        return (
            <Box id="update-movie-vote-average-box">
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
                                <span>{(this.state.vote * 1).toFixed(2)}/</span><span id="voteSelectedMovie">10</span>
                                <RateMovie id={this.state.movie_id} />
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
                                        className="linkedClass">
                                        {this.state.language}
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
                                <a href={'https://www.imdb.com/title/' + this.state.imdb} target="_blank" rel="noreferrer">
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
                                {this.state.countries.map(e => e.charAt(0).toUpperCase() + e.slice(1)).map((e, i) =>
                                    <Typography fontSize={15} key={i} style={{ marginRight: 4, marginTop: 10, marginLeft: 2 }}>
                                        <a href={'/country-result?selected_country=' + e} className="linkedClass"> {e}</a>
                                    </Typography>)}
                            </Box>}
                        {this.state.languages !== null && <Box className="SelectedMovieDataBox">
                            <Typography style={{ fontWeight: 'bold', marginRight: 6, marginTop: 10 }}>Available in:</Typography>
                            {this.state.languages.map(e => e.charAt(0).toUpperCase() + e.slice(1)).map((e, i) =>
                                <Typography fontSize={15} key={i} style={{ marginRight: 4, marginTop: 10 }}>
                                    <a href={'/language-result?selected_language=' + e} className="linkedClass">
                                        {e}
                                    </a>
                                </Typography>)}
                        </Box>}
                        {this.state.company !== null && <Box className="SelectedMovieDataBox">
                            <Typography style={{ fontWeight: 'bold', marginRight: 6, marginTop: 10 }}>Production Company:</Typography>
                            {this.state.company.map(e => e.charAt(0).toUpperCase() + e.slice(1)).map((e, i) =>
                                <Typography fontSize={15} key={i} style={{ marginRight: 8, marginTop: 10 }}>
                                    {e}
                                </Typography>)}
                        </Box>}
                    </Box>
                </Box >
                <Advertisement />
            </Box>
        );
    }
}

export default MovieClicked;