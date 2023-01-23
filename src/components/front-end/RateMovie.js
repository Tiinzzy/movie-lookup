import React from "react";

import Box from "@mui/material/Box";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import IconButton from '@mui/material/IconButton';

import './style.css';

class RateMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.ratingMovie = this.ratingMovie.bind(this);
    }

    ratingMovie() {
        console.log('rating')
    }

    render() {
        return (
            <>
                <Box>
                    <IconButton onClick={() => this.ratingMovie()}>
                        <StarHalfIcon fontSize="large" id="RateMovieRatingStar" />
                    </IconButton>
                </Box>
            </>
        );
    }
}

export default RateMovie;