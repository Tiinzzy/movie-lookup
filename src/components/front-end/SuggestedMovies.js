import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';

import BackEndConnection from './BackEndConnection';

import { shared } from "./functions";

import './style.css';

const backend = BackEndConnection.INSTANCE();

class SuggestedMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.movieSelected = this.movieSelected.bind(this);
    }

    async componentDidMount() {
        let movies = await backend.get_movies();
        this.setState({ randomMovies: movies });
    }

    async movieSelected(e) {
        let data = await backend.get_selected_movie(e);
        shared.callSearchResult({ action: 'selected_movie_data_recieved', movie: data });
    }

    render() {
        return (
            <Box className="SuggestedMoviesMainBox" style={{ width: window.innerWidth - 300 }}>
                {this.state.randomMovies && this.state.randomMovies.map((e, i) =>
                    <Box key={i} mb={2} onClick={() => this.movieSelected(e.movie_id)} style={{ cursor: 'pointer' }}>
                        <Box className="MovieTitleBox">
                            <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }} key={i}>{e.title}</Typography>
                            <span className="VoteStyle"><StarIcon /></span>{e.vote}<span className="VoteCountStyle">({e.vote_count})</span>
                        </Box>
                        <Box className="MovieOverviewBox">
                            <Typography variant="body1">
                                {e.overview}
                            </Typography>
                        </Box>
                    </Box>)}
            </Box>
        );
    }
}

export default SuggestedMovies;