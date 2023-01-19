import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';

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

class CountryResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            selected_country: props.selected_country.trim()
        };
        console.log(props.selected_country)
    }

    async componentDidMount() {
        this.getDataForDisplay(1);
    }

    async getDataForDisplay(e) {
        this.setState({ showProgress: true }, async function () {
            let pageNumber = (e - 1) * 6;
            let countryResult = await backend.get_movies_based_on_countries(this.state.selected_country, pageNumber);
            this.setState({
                showProgress: false,
                countries: countryResult.rows,
                length: getPageCount(countryResult.row_count, PAGE_SIZE)
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
                <Box className="CountryResMainBox">
                    {this.state.countries && this.state.countries.map((e, i) =>
                        <Box className="CountryResDetailBox" key={i}>
                            <Box className="CountryResTitleBox">
                                <a className='MovieTitleLink' href={"/movie-clicked?movie_id=" + e.id}>
                                    <Typography variant="h6" fontWeight="bold"
                                        style={{ display: 'inline-block', cursor: 'pointer' }}>
                                        {e.title}
                                    </Typography>
                                </a>
                                <span className="countStar"><StarIcon /></span>{e.vote}<span className="VoteCountStyle">({e.vote_average})</span>
                            </Box>
                            <Box className="CountryResCountBox">
                                <Typography variant="body1" mb={2}>
                                    {e.overview}
                                </Typography>
                                <span className="CountryResProCountTitle">Production Countries:</span>
                                {e.country.split(',').map(e => e.trim()).map((g, i) => (
                                    <Typography key={i} variant="caption" style={{ marginRight: 7, fontSize: 13 }}>
                                        <a className={g === this.state.selected_country ? 'SearchedClass' : 'NormalClass'} href={'/country-result?selected_country=' + g}>{g}</a>
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

export default CountryResult;