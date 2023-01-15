import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BackEndConnection from './BackEndConnection';
import TopTenMoviesGenre from './TopTenMoviesGenre';

import './style.css';

const backend = BackEndConnection.INSTANCE();

class SideBarMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async componentDidMount() {
        let topTen = await backend.get_top_movies('');
        this.setState({ topMovies: topTen });
    }

    render() {
        return (
            <Box className="SideMvvies">
                <Typography variant="h5" fontWeight='bold' mb={1}> Top Rated </Typography>
                <TopTenMoviesGenre />
                {this.state.topMovies && this.state.topMovies.map((e, i) =>
                    <Box className="EachSideMovieBox" key={i}>
                        <Typography variant="body1" fontWeight='600'>{e.title}</Typography>
                        <Typography variant="body1" fontWeight='300' style={{ paddingTop: 5, borderTop: 'solid 1px rgb(57, 57, 57)' }}>"{e.tagline}"</Typography>
                    </Box>)}
            </Box>
        );
    }
}

export default SideBarMovies;