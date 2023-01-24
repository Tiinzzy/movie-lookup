import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';

import BackEndConnection from './BackEndConnection';

import { LISTENERS } from "./messaging";
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

    componentDidMount() {

        LISTENERS.getUpdateVotes().addEventListener('movie-voting-has-been-updated',
            (e) => {
                this.setState({ vote: e.detail.vote });
            }
            , false);

        if (shared.initial_render_count === 0) {
            shared.initial_render_count += 1;
            let that = this;
            backend.get_movies((data) => {
                that.setState({ randomMovies: data });
            });
        }
    }

    async movieSelected(e) {
        window.location = '/movie-clicked?movie_id=' + e
    }

    render() {
        return (
            <Box className="SuggestedMoviesMainBox" style={{ width: window.innerWidth - 300 }} id="update-movie-vote-average-box">
                {this.state.randomMovies && this.state.randomMovies.map((e, i) =>
                    <Box key={i} mb={2}>
                        <Box className="MovieTitleBox">
                            <Typography onClick={() => this.movieSelected(e.movie_id)} variant="h6" fontWeight="bold"
                                style={{ display: 'inline-block', cursor: 'pointer' }} key={i}>{e.title}</Typography>
                            <span className="VoteStyle"><StarIcon /></span>{(e.vote).toFixed(2) || (this.state.vote * 1).toFixed(2)}
                            <span className="VoteCountStyle">({e.vote_count})</span>
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