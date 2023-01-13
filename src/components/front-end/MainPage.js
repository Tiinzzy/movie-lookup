import React from "react";

import Box from "@mui/material/Box";

import SearchResuts from './SearchResuts';
import MiniVersion from './MiniVersion';
import SideMovies from './SideMovies';

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
                <Box display='flex' >
                    <Box style={{ width: 300, background: '#eaeaea' }}>
                        <SideMovies />
                    </Box>
                    <Box flexGrow={1} style={{ background: '#fff' }}>
                        <SearchResuts />
                    </Box>
                </Box>
                <Box className="SLiderBox" style={{ margin: 100, width: '90%'}}>
                    <MiniVersion />
                </Box>
            </>
        );
    }
}

export default MainPage;