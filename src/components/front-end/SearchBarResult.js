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

class SearchBarResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searched_item: props.searched_item,
            showProgress: false
        };
    }
    async componentDidMount() {
        this.getDataForDisplay(1);
    }

    async getDataForDisplay(e) {
        this.setState({ showProgress: true }, async function () {
            let pageNumber = (e - 1) * 6;
            let searchResult = await backend.get_search_results(this.state.searched_item, pageNumber);
            console.log(searchResult);
            this.setState({
                showProgress: false,
                randomMovies: searchResult.rows,
                length: getPageCount(searchResult.row_count, PAGE_SIZE)
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
                                <a className='MovieTitleLink' href={"/movie-clicked?movie_id=" + e.id}>
                                    <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>{e.title}</Typography>
                                </a>
                                <span className="VoteStyle"><StarIcon /></span>{e.vote}<span className="VoteCountStyle">({e.vote_average})</span>
                            </Box>
                            <Box className="MovieOverviewBox">
                                <Typography variant="body1" mb={2}>
                                    {e.overview}
                                </Typography>
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

export default SearchBarResult;