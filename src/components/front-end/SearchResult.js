import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

const PAGE_SIZE = 5;

function getPageCount(rowCount, pageSize) {
    let pageCount = Math.floor(rowCount / pageSize);
    if (pageCount * pageSize < rowCount) {
        pageCount += 1;
    }
    return pageCount;
}


class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countBegin: 0,
            countCut: 6,
            showForwardArrow: false,
            showBackwardArrow: false,
            showProgress: false
        };
    }

    async componentDidMount() {
        this.getDataForDisplay(1);
    }

    async getDataForDisplay(e) {
        this.setState({ showProgress: true }, async function () {
            let pageNumber = (e - 1) * 5;
            let result = await backend.get_movies_based_on_genres('comedy', pageNumber);
            this.setState({
                showProgress: false,
                randomMovies: result.rows,
                length: getPageCount(result.row_count, PAGE_SIZE)
            });
            console.log(result)
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
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Box style={{ marginLeft: 'auto' }}>
                            <Pagination count={this.state.length} onChange={(e, i) => this.getDataForDisplay(i)} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default SearchResult;