import React from "react";

import Box from "@mui/material/Box";

import SuggestedMovies from './SuggestedMovies';
import CarouselSlider from './CarouselSlider';
import SideBarMovies from './SideBarMovies';

import './style.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <>
                <Box display='flex'>
                    <Box style={{ width: 500 }}>
                        <SideBarMovies />
                    </Box>
                    <Box flexGrow={1}>
                        <SuggestedMovies />
                    </Box>
                </Box>
                <Box className="SLiderBox">
                    <CarouselSlider />
                </Box>
            </>
        );
    }
}

export default Home;