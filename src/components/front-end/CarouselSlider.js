import React, { Component } from "react";
import Slider from "react-slick";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';

import BackEndConnection from './BackEndConnection';

import { LISTENERS } from "./messaging";
import { niceTitle } from './functions';

import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const backend = BackEndConnection.INSTANCE();

export default class CarouselSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.movieSelected = this.movieSelected.bind(this);
        this.genreClicked = this.genreClicked.bind(this);
    }

    componentDidMount() {

        LISTENERS.getUpdateVotes().addEventListener('movie-voting-has-been-updated',
            (e) => {
                this.setState({ vote: e.detail.vote });
            }
            , false);

        let that = this;
        backend.get_movies(function (data) {
            that.setState({ randomMovies: data });
        });
    }

    movieSelected(e) {
        window.location = '/movie-clicked?movie_id=' + e
    }

    genreClicked(e) {
        window.location = '/genre-result?selected_genre=' + e;
    }

    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div>
                <Slider {...settings}>
                    {this.state.randomMovies && this.state.randomMovies.map((e, i) =>
                        <div key={i}>
                            <Box className="EachMovieBox" id="update-movie-vote-average-box">
                                <Box className="MovieTitleVoteBox">
                                    <Typography title={e.title} variant="h6" fontWeight="bold"
                                        style={{ fontSize: 14, cursor: 'pointer' }}
                                        key={i}
                                        onClick={() => this.movieSelected(e.movie_id)}>
                                        {niceTitle(e.title)}
                                    </Typography>
                                    <span className="StarSpan"><StarIcon /></span>
                                    <span style={{ fontSize: 14 }}>{(e.vote * 1).toFixed(2) || (this.state.vote * 1).toFixed(2)}</span>
                                </Box>
                                <Box className="GenreImdbBox">
                                    <a href={'https://www.imdb.com/title/' + e.imdb} target="_blank" id='genreClick' rel="noreferrer">
                                        <img src="/imdb.png" height="12" alt="#" />
                                    </a>
                                    <span className="GenresSlider">Genres:</span>
                                    <Box className="EachGenreBox">
                                        {e.genres.split(',').map((g, i) => (
                                            <a key={i} title={g} target="_blank" href="/#" id='genreClick' className="GenreLink"
                                                onClick={() => this.genreClicked(g)}>{g}
                                            </a>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </div>)}
                </Slider>
            </div>
        );
    }
}






