import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';

import BackEndConnection from './BackEndConnection';
import Advertisement from './Advertisement';

import { LISTENERS } from "./messaging";
import { getPageCount } from './functions';

import './style.css';

const backend = BackEndConnection.INSTANCE();
const PAGE_SIZE = 10;

class CountryResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            selected_country: props.selected_country.trim()
        };
        this.getDataForDisplay = this.getDataForDisplay.bind(this);
    }

    componentDidMount() {
        this.getDataForDisplay(1);
        let country = localStorage.getItem('country_id');
        console.log(new Date(), country);
        localStorage.removeItem('country_id');

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
            backend.get_movies_based_on_countries(this.state.selected_country, pageNumber, (data) => {
                that.setState({
                    showProgress: false,
                    countries: data.rows,
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
                                <span className="countStar"><StarIcon /></span>
                                {(e.vote_average * 1).toFixed(2) || (this.state.vote * 1).toFixed(2)}
                                <span className="VoteCountStyle">({e.count})</span>
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
                <Advertisement />
            </Box>
        );
    }
}

export default CountryResult;