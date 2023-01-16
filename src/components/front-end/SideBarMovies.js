import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BackEndConnection from './BackEndConnection';
import TopTenMoviesGenre from './TopTenMoviesGenre';

import { shared } from './functions';

import './style.css';

const backend = BackEndConnection.INSTANCE();

function cleanUp(tag) {
    if (tag === '0') {
        return 'No Tagline Available';
    } else {
        return tag;
    }
}

class SideBarMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.callSideBarMovies = this.callSideBarMovies.bind(this);
        shared.callSideBarMovies = this.callSideBarMovies;
    }

    async componentDidMount() {
        let topTen = await backend.get_top_movies('');
        this.setState({ topMovies: topTen });
    }

    async callSideBarMovies(message) {
        if (message.action === 'genre-has-been-selected') {
            if (message.data === '- ALL -') {
                let topTen = await backend.get_top_movies('');
                this.setState({ topMovies: topTen });
            } else {
                let topTen = await backend.get_top_movies(message.data);
                this.setState({ topMovies: topTen });
            }

        }
    }

    render() {
        return (
            <Box className="SideMvvies">
                <Typography variant="h6" fontWeight='bold' mb={1} fontSize={20}> Top Rated Movies</Typography>
                <TopTenMoviesGenre />
                {this.state.topMovies && this.state.topMovies.map((e, i) =>
                    <Box className="EachSideMovieBox" key={i}>
                        <Typography variant="body1" fontWeight='600'>{e.title}</Typography>
                        <Typography variant="body1" fontWeight='300' style={{ paddingTop: 5, borderTop: 'solid 1px rgb(215, 215, 215)' }}>"{cleanUp(e.tagline)}"</Typography>
                    </Box>)}
            </Box>
        );
    }
}

export default SideBarMovies;