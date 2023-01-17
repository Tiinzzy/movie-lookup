import React, { Component } from "react";
import Slider from "react-slick";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';

import BackEndConnection from './BackEndConnection';

import { shared } from "./functions";

import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const backend = BackEndConnection.INSTANCE();
const TITLE_LENGTH = 12;

function niceTitle(t) {
    if (t.length < TITLE_LENGTH) {
        return t;
    } else {
        return t.substring(0, TITLE_LENGTH) + ' ...'
    }
}

export default class CarouselSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.movieSelected = this.movieSelected.bind(this);
    }

    async componentDidMount() {
        let movies = await backend.get_movies();
        console.log(movies)
        this.setState({ randomMovies: movies })
    }

    async movieSelected(e) {
        let data = await backend.get_selected_movie(e);
        shared.callSearchResult({ action: 'selected_movie_data_recieved', movie: data });
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
                        <div key={i} onClick={() => this.movieSelected(e.movie_id)}>
                            <Box className="EachMovieBox" style={{ cursor: 'pointer' }}>
                                <Box className="MovieTitleVoteBox">
                                    <Typography title={e.title} variant="h6" fontWeight="bold" style={{ fontSize: 14 }} key={i}>{niceTitle(e.title)}</Typography>
                                    <span className="StarSpan"><StarIcon /></span>
                                    <span style={{ fontSize: 14 }}>{e.vote}</span>
                                </Box>
                                <Box className="GenreImdbBox">
                                    <a href={'https://www.imdb.com/title/' + e.imdb} target="_blank" id='genreClick'>
                                        <img src="/imdb.png" height="12" alt="#" />
                                    </a>
                                    <span className="GenresSlider">Genres:</span>
                                    <Box className="EachGenreBox">
                                        {e.genres.split(',').map((g, i) => (
                                            <a key={i} title={g} target="_blank" href="#" id='genreClick' className="GenreLink">{g}</a>
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






