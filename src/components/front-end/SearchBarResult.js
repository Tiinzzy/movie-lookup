import React from "react";

import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box";

import BackEndConnection from './BackEndConnection';
import Advertisement from './Advertisement';
import { getPageCount } from './functions';

import './style.css';

const backend = BackEndConnection.INSTANCE();
const PAGE_SIZE = 10;

class SearchBarResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searched_item: props.searched_item,
            showProgress: false
        };
        this.getDataForDisplay = this.getDataForDisplay.bind(this);
    }

    componentDidMount() {
        this.getDataForDisplay(1);
    }

    getDataForDisplay(e) {
        this.setState({ showProgress: true }, function () {
            let pageNumber = (e - 1) * 10;
            let that = this;
            backend.get_search_results(this.state.searched_item, pageNumber, (data) => {
                that.setState({
                    showProgress: false,
                    result: data.rows,
                    length: getPageCount(data.row_count, PAGE_SIZE)
                }, () => { window.scrollTo(0, 0); });
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
                <Box className="SearchBarMainBox">
                    {this.state.result && this.state.result.map((e, i) =>
                        <Box key={i} className="SearchBarDetailBox">
                            <Box className="SearchBarTitleBox">
                                <a className='MovieTitleLink' href={"/movie-clicked?movie_id=" + e.id}>
                                    <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>{e.title}</Typography>
                                </a>
                                <span className="VoteStyle"><StarIcon /></span>{e.vote}<span className="VoteCountStyle">({e.vote_average})</span>
                            </Box>
                            <Box className="SearchBarOverviewBox">
                                <Typography variant="body1" mb={2}>
                                    {e.overview}
                                </Typography>
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

export default SearchBarResult;