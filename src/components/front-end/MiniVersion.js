import React, { Component } from "react";
import Slider from "react-slick";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StarIcon from '@mui/icons-material/Star';

import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GENRES = ['Darama', 'Action', 'Mafia', 'Crime'];

export default class MiniVersion extends Component {
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
                    <div>
                        <Box className="EachMovie">
                            <Box className="MiniBx1">
                                <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>The Godfather (1972)</Typography>
                                <span style={{ color: '#F5C518', marginLeft: 5, marginRight: 2 }}><StarIcon /> </span>9.2
                            </Box>
                            <Box className="MiniBx2">
                                {GENRES.map((e, i) =>
                                    <a target="_blank" href="#" key={i} id='genreClick' style={{ marginRight: 8 }}>{e}</a>
                                )}
                            </Box>
                        </Box>
                    </div>
                    <div>
                        <Box className="EachMovie">
                            <Box className="MiniBx1">
                                <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>The Godfather (1972)</Typography>
                                <span style={{ color: '#F5C518', marginLeft: 5, marginRight: 2 }}><StarIcon /> </span>9.2
                            </Box>
                            <Box className="MiniBx2">
                                {GENRES.map((e, i) =>
                                    <a target="_blank" href="#" key={i} id='genreClick' style={{ marginRight: 8 }}>{e}</a>
                                )}
                            </Box>
                        </Box>
                    </div>
                    <div>
                        <Box className="EachMovie">
                            <Box className="MiniBx1">
                                <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>The Godfather (1972)</Typography>
                                <span style={{ color: '#F5C518', marginLeft: 5, marginRight: 2 }}><StarIcon /> </span>9.2
                            </Box>
                            <Box className="MiniBx2">
                                {GENRES.map((e, i) =>
                                    <a target="_blank" href="#" key={i} id='genreClick' style={{ marginRight: 8 }}>{e}</a>
                                )}
                            </Box>
                        </Box>
                    </div>
                    <div>
                        <Box className="EachMovie">
                            <Box className="MiniBx1">
                                <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>The Godfather (1972)</Typography>
                                <span style={{ color: '#F5C518', marginLeft: 5, marginRight: 2 }}><StarIcon /> </span>9.2
                            </Box>
                            <Box className="MiniBx2">
                                {GENRES.map((e, i) =>
                                    <a target="_blank" href="#" key={i} id='genreClick' style={{ marginRight: 8 }}>{e}</a>
                                )}
                            </Box>
                        </Box>
                    </div>
                    <div>
                        <Box className="EachMovie">
                            <Box className="MiniBx1">
                                <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>The Godfather (1972)</Typography>
                                <span style={{ color: '#F5C518', marginLeft: 5, marginRight: 2 }}><StarIcon /> </span>9.2
                            </Box>
                            <Box className="MiniBx2">
                                {GENRES.map((e, i) =>
                                    <a target="_blank" href="#" key={i} id='genreClick' style={{ marginRight: 8 }}>{e}</a>
                                )}
                            </Box>
                        </Box>
                    </div>
                    <div>
                        <Box className="EachMovie">
                            <Box className="MiniBx1">
                                <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>The Godfather (1972)</Typography>
                                <span style={{ color: '#F5C518', marginLeft: 5, marginRight: 2 }}><StarIcon /> </span>9.2
                            </Box>
                            <Box className="MiniBx2">
                                {GENRES.map((e, i) =>
                                    <a target="_blank" href="#" key={i} id='genreClick' style={{ marginRight: 8 }}>{e}</a>
                                )}
                            </Box>
                        </Box>
                    </div>
                    <div>
                        <Box className="EachMovie">
                            <Box className="MiniBx1">
                                <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>The Godfather (1972)</Typography>
                                <span style={{ color: '#F5C518', marginLeft: 5, marginRight: 2 }}><StarIcon /> </span>9.2
                            </Box>
                            <Box className="MiniBx2">
                                {GENRES.map((e, i) =>
                                    <a target="_blank" href="#" key={i} id='genreClick' style={{ marginRight: 8 }}>{e}</a>
                                )}
                            </Box>
                        </Box>
                    </div>
                    <div>
                        <Box className="EachMovie">
                            <Box className="MiniBx1">
                                <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>The Godfather (1972)</Typography>
                                <span style={{ color: '#F5C518', marginLeft: 5, marginRight: 2 }}><StarIcon /> </span>9.2
                            </Box>
                            <Box className="MiniBx2">
                                {GENRES.map((e, i) =>
                                    <a target="_blank" href="#" key={i} id='genreClick' style={{ marginRight: 8 }}>{e}</a>
                                )}
                            </Box>
                        </Box>
                    </div>
                    <div>
                        <Box className="EachMovie">
                            <Box className="MiniBx1">
                                <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>The Godfather (1972)</Typography>
                                <span style={{ color: '#F5C518', marginLeft: 5, marginRight: 2 }}><StarIcon /> </span>9.2
                            </Box>
                            <Box className="MiniBx2">
                                {GENRES.map((e, i) =>
                                    <a target="_blank" href="#" key={i} id='genreClick' style={{ marginRight: 8 }}>{e}</a>
                                )}
                            </Box>
                        </Box>
                    </div>
                </Slider>
            </div>
        );
    }
}






