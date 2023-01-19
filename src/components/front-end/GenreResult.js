import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';

import BackEndConnection from './BackEndConnection';
import { getPageCount } from './functions';

import './style.css';

const backend = BackEndConnection.INSTANCE();
const PAGE_SIZE = 6;

class GenreResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            selected_genre: props.selected_genre.trim()
        };
    }

    async componentDidMount() {
        this.getDataForDisplay(1);
    }

    async getDataForDisplay(e) {
        this.setState({ showProgress: true }, async function () {
            let pageNumber = (e - 1) * 6;
            let genreResult = await backend.get_movies_based_on_genres(this.state.selected_genre, pageNumber);
            this.setState({
                showProgress: false,
                randomMovies: genreResult.rows,
                length: getPageCount(genreResult.row_count, PAGE_SIZE)
            });
        });
    }

    render() {
        return (
            <Box>
                {this.state.showProgress ?
                    <Box className="LoadingBarBox"><LinearProgress color="inherit" /></Box> :
                    <Box className="LoadingBarBoxSize"></Box>
                }
                <Box className="GenreResMainBox">
                    {this.state.randomMovies && this.state.randomMovies.map((e, i) =>
                        <Box key={i} className="GenreResDetailBox">
                            <Box className="GenreResTitleBox">
                                <a className='MovieTitleLink' href={"/movie-clicked?movie_id=" + e.id}>
                                    <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>{e.title}</Typography>
                                </a>
                                <span className="VoteStyle"><StarIcon /></span>{e.vote}<span className="VoteCountStyle">({e.vote_average})</span>
                            </Box>
                            <Box className="GenreResOverviewBox">
                                <Typography variant="body1" mb={2}>
                                    {e.overview}
                                </Typography>
                                {e.genres.split(',').map(e => e.trim()).map((g, i) => (
                                    <Typography key={i} variant="caption" style={{ border: g === this.state.selected_genre ? 'solid 1px #e9bc16' : 'solid 1px black', borderRadius: 6, padding: 6, marginRight: 10 }}>
                                        <a className={g === this.state.selected_genre ? 'SearchedClass' : 'NormalClass'} href={'/genre-result?selected_genre=' + g}>{g}</a>
                                    </Typography>))}
                            </Box>
                        </Box>)}
                    <Box className="PaginationStyle">
                        <Pagination count={this.state.length} onChange={(e, i) => this.getDataForDisplay(i)} />
                    </Box>
                </Box>
            </Box >
        );
    }
}

export default GenreResult;