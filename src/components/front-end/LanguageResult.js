import React from "react";

import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box";

import BackEndConnection from './BackEndConnection';
import { getPageCount } from './functions';

import './style.css';

const backend = BackEndConnection.INSTANCE();
const PAGE_SIZE = 6;

class LanguageResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_language: props.selected_language.trim(),
            showProgress: false
        };
    }

    async componentDidMount() {
        this.getDataForDisplay(1);
    }

    async getDataForDisplay(e) {
        this.setState({ showProgress: true }, async function () {
            let pageNumber = (e - 1) * 6;
            let languageResult = await backend.get_movies_based_on_spoken_languages(this.state.selected_language, pageNumber);
            this.setState({
                showProgress: false,
                randomMovies: languageResult.rows,
                length: getPageCount(languageResult.row_count, PAGE_SIZE)
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
                <Box className="LangResMainBox">
                    {this.state.randomMovies && this.state.randomMovies.map((e, i) =>
                        <Box key={i} className="LangResDetailBox">
                            <Box className="LangResTitleBox">
                                <a className='MovieTitleLink' href={"/movie-clicked?movie_id=" + e.id}>
                                    <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>{e.title}</Typography>
                                </a>
                                <span className="VoteStyle"><StarIcon /></span>{e.vote}<span className="VoteCountStyle">({e.vote_average})</span>
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

            </Box>
        );
    }
}

export default LanguageResult;