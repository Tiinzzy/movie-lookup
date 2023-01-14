import React, { Component } from "react";
import Slider from "react-slick";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';

import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BackEndConnection from './BackEndConnection';
const backend = BackEndConnection.INSTANCE();

const TITLE_LENGTH = 16;

function niceTitle(t){
    if (t.length < TITLE_LENGTH){
        return t;
    } else {
        return t.substring(0,TITLE_LENGTH) + ' ...'
    }
}

export default class CarouselSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async componentDidMount() {
        let movies = await backend.get_movies();
        this.setState({ randomMovies: movies })
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
                        <div>
                            <Box className="EachMovieBox">
                                <Box className="MovieTitleVoteBox">
                                    <Typography title={e.title} variant="h6" fontWeight="bold" style={{ fontSize: 14 }} key={i}>{niceTitle(e.title)}</Typography>
                                    <span style={{ color: '#F5C518', marginLeft: 4, marginRight: 2 }}><StarIcon /></span>
                                    <span style={{ fontSize: 14 }}>{e.vote}</span>
                                </Box>
                                <Box className="GenreImdbBox">
                                    <a href={'https://www.imdb.com/title/' + e.imdb} target="_blank" id='genreClick'>
                                        <img src="/imdb.png" height="12"/>
                                    </a>
                                    {/* <a target="_blank" href="#" id='genreClick' style={{ marginTop: 8 }}> Genres </a> */}
                                </Box>
                            </Box>
                        </div>)}
                </Slider>
            </div>
        );
    }
}






