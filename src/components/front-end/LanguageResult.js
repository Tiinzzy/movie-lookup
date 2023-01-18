import React from "react";

import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box";

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();
const PAGE_SIZE = 6;

function getPageCount(rowCount, pageSize) {
    let pageCount = Math.floor(rowCount / pageSize);
    if (pageCount * pageSize < rowCount) {
        pageCount += 1;
    }
    return pageCount;
}


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
                    <Box sx={{ color: 'grey.500' }}><LinearProgress color="inherit" /></Box> :
                    <div style={{ height: 4 }}></div>
                }
                <Box style={{ display: 'flex', flexDirection: 'column', padding: 45 }}>
                    {this.state.randomMovies && this.state.randomMovies.map((e, i) =>
                        <Box key={i} mb={2} style={{ cursor: 'pointer' }}>
                            <Box className="MovieTitleBox">
                                <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>{e.title}</Typography>
                                <span className="VoteStyle"><StarIcon /></span>{e.vote}<span className="VoteCountStyle">({e.vote_average})</span>
                            </Box>
                            <Box className="MovieOverviewBox">
                                <Typography variant="body1" mb={2}>
                                    {e.overview}
                                </Typography>
                                <span style={{ fontWeight: 'bold', fontSize: 14, marginRight: 6 }}>Available Languages:</span>
                                {e.languages.split(',').map(e => e.trim()).map((g, i) => (
                                    <Typography key={i} variant="caption" style={{ marginRight: 4, fontSize: 12 }}>
                                        <a className={g === this.state.selected_language ? 'SearchedClass' : 'NormalClass'} href={'/language-result?selected_language=' + g}>{g}</a>
                                    </Typography>))}
                            </Box>
                        </Box>)}
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Pagination count={this.state.length} onChange={(e, i) => this.getDataForDisplay(i)} />
                    </Box>
                </Box>

            </Box>
        );
    }
}

export default LanguageResult;