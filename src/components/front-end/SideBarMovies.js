import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BackEndConnection from './BackEndConnection';
import TopTenMoviesGenre from './TopTenMoviesGenre';

import { cleanUp } from './functions';
import { emitter, LISTENERS } from './messaging';

import './style.css';

const backend = BackEndConnection.INSTANCE();

class SideBarMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        
        this.movieSelected = this.movieSelected.bind(this);
    }

    componentDidMount() {
        let that = this;
        backend.get_top_movies('', function (data) {
            that.setState({ topMovies: data });
        });

        LISTENERS.getSelectedGenre().addEventListener('new-genre-has-been-selected',
            (e) => {
                if (e.detail.data === '- ALL -') {
                    let that = this;
                    backend.get_top_movies('', function (data) {
                        that.setState({ topMovies: data });
                    });
                } else {
                    let that = this;
                    backend.get_top_movies(e.detail.data, (data) => {
                        that.setState({ topMovies: data });
                    });
                }
            }
            , false);
    }

    movieSelected(e) {
        window.location = '/movie-clicked?movie_id=' + e
    }

    sendToSearch(title) {

        emitter.emit('search-this-text', { title, date: new Date() });
    }

    render() {
        return (
            <Box className="SideMovies" id="side-movies-box">
                <Typography variant="h6" fontWeight='bold' mb={1} fontSize={16}> Top Rated Movies</Typography>
                <TopTenMoviesGenre />
                {this.state.topMovies && this.state.topMovies.map((e, i) =>
                    <Box className="EachSideMovieBox" key={i}>
                        <Typography variant="body1" fontWeight='600' style={{ cursor: 'pointer' }} onClick={() => this.movieSelected(e.id)}>{e.title}</Typography>
                        <Typography variant="body1" fontWeight='300'
                            style={{ paddingTop: 5, borderTop: 'solid 1px #f2f2f2' }}
                            onClick={() => this.sendToSearch(e.title)}
                        >"{cleanUp(e.tagline)}"</Typography>
                    </Box>)}
            </Box>
        );
    }
}

export default SideBarMovies;