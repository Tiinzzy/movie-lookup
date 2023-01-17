import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countBegin: 0,
            countCut: 5,
            showForwardArrow: false,
            showBackwardArrow: false
        };
        this.forwardClicked = this.forwardClicked.bind(this);
        this.backwardClicked = this.backwardClicked.bind(this);
    }

    async componentDidMount() {
        let movies = await backend.get_movies();
        this.setState({ randomMovies: movies });
    }

    forwardClicked() {
        let total = this.state.randomMovies.length;
        console.log(total)
        this.setState({ countBegin: this.state.countBegin + 5, countCut: this.state.countCut + 5 });
        if (this.state.countBegin === 0 || this.state.countBegin) {
            this.setState({ showBackwardArrow: true });
        } else {
            this.setState({ showBackwardArrow: false });
        }
    }

    backwardClicked() {
        this.setState({ countBegin: this.state.countBegin - 5, countCut: this.state.countCut - 5 });
    }

    render() {
        return (
            <>
                <Box style={{ display: 'flex', flexDirection: 'column', padding: 45 }}>
                    {this.state.randomMovies && this.state.randomMovies.slice(this.state.countBegin, this.state.countCut).map((e, i) =>
                        <Box key={i} mb={2} style={{ cursor: 'pointer' }}>
                            <Box className="MovieTitleBox">
                                <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>{e.title}</Typography>
                                <span className="VoteStyle"><StarIcon /></span>{e.vote}<span className="VoteCountStyle">({e.vote_count})</span>
                            </Box>
                            <Box className="MovieOverviewBox">
                                <Typography variant="body1" mb={2}>
                                    {e.overview}
                                </Typography>
                                {e.genres.split(',').map((g, i) => (
                                    <Typography key={i} variant="caption" style={{ border: 'solid 1px black', borderRadius: 6, padding: 6, marginRight: 10 }}>
                                        {g}
                                    </Typography>))}
                            </Box>
                        </Box>)}
                    <Box style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
                        {this.state.showBackwardArrow && <Box style={{ marginRight: 'auto' }}>
                            <ArrowBackIosIcon onClick={() => this.backwardClicked()} fontSize="large" />
                        </Box>}
                        <Box style={{ marginLeft: 'auto' }}>
                            <ArrowForwardIosIcon cursor="pointer" onClick={() => this.forwardClicked()} fontSize="large" />
                        </Box>
                    </Box>
                </Box>
            </>
        );
    }
}

export default SearchResult;