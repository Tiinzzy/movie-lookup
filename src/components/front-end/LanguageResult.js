import React from "react";

import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box";

import BackEndConnection from './BackEndConnection';
import Advertisement from './Advertisement';

import { LISTENERS } from "./messaging";
import { getPageCount } from './functions';

import './style.css';

const backend = BackEndConnection.INSTANCE();
const PAGE_SIZE = 10;

class LanguageResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_language: props.selected_language.trim(),
            showProgress: false
        };
        this.getDataForDisplay = this.getDataForDisplay.bind(this);
    }

    componentDidMount() {
        this.getDataForDisplay(1);

        LISTENERS.getUpdateVotes().addEventListener('movie-voting-has-been-updated',
            (e) => {
                this.setState({ vote: e.detail.vote });
            }
            , false);
    }

    getDataForDisplay(e) {
        this.setState({ showProgress: true }, function () {
            let pageNumber = (e - 1) * 10;
            let that = this;
            backend.get_movies_based_on_spoken_languages(this.state.selected_language, pageNumber, (data) => {
                console.log(data)
                that.setState({
                    showProgress: false,
                    randomMovies: data.rows,
                    length: getPageCount(data.row_count, PAGE_SIZE)
                }, () => { window.scrollTo(0, 0); });
            });
        });
    }

    render() {
        return (
            <Box id="update-movie-vote-average-box">
                {this.state.showProgress ?
                    <Box className="LoadingBarBox"><LinearProgress color="inherit" /></Box> :
                    <Box className="LoadingBarBoxSize"></Box>
                }
                <Box className="LangResMainBox">
                    {this.state.randomMovies && this.state.randomMovies.map((e, i) =>
                        <Box key={i} className="LangResDetailBox">
                            <Box className="LangResTitleBox">
                                <a className='MovieTitleLink' href={"/movie-clicked?movie_id=" + e.id}>
                                    <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>{e.title}</Typography>
                                </a>
                                <span className="VoteStyle"><StarIcon /></span>
                                <span className="VoteCountStyle">({(e.vote_average * 1).toFixed(2) || (this.state.vote * 1).toFixed(2)})</span>
                            </Box>
                            <Box className="LangResOverviewBox">
                                <Typography variant="body1" mb={2}>
                                    {e.overview}
                                </Typography>
                                <span className="LangAvailable">Available Languages:</span>
                                {e.languages.split(',').map(e => e.trim()).map((g, i) => (
                                    <Typography key={i} variant="caption" style={{ marginRight: 4, fontSize: 12 }}>
                                        <a className={g === this.state.selected_language ? 'SearchedClass' : 'NormalClass'} href={'/language-result?selected_language=' + g}>{g}</a>
                                    </Typography>))}
                            </Box>
                        </Box>)}
                    <Box className="PaginationStyle">
                        <Pagination count={this.state.length} onChange={(e, i) => this.getDataForDisplay(i)} />
                    </Box>
                </Box>
                <Advertisement />
            </Box>
        );
    }
}

export default LanguageResult;