import React from "react";

import Box from "@mui/material/Box";

import SearchResuts from './SearchResuts';
import CarouselSlider from './CarouselSlider';
import SideBarMovies from './SideBarMovies';

import './style.css';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <>
                <Box display='flex'>
                    <Box style={{ width: 300, background: '#eaeaea' }}>
                        <SideBarMovies />
                    </Box>
                    <Box flexGrow={1}>
                        <SearchResuts />
                    </Box>
                </Box>
                <Box className="SLiderBox">
                    <CarouselSlider />
                </Box>
            </>
        );
    }
}

export default MainPage;