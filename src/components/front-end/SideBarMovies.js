import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

class SideBarMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async componentDidMount() {
        // backend.get_top_movies('comedy');   
    }

    render() {
        return (
            <Box className="SideMvvies">
                <Typography variant="h6" fontWeight='bold'> Top Rated </Typography>
                <Box className="EachSideMovieBox">
                    <Typography variant="body1" fontWeight='500'> ghbgfb</Typography>
                </Box>
            </Box>
        );
    }
}

export default SideBarMovies;