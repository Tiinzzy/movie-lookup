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


class GenreResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            selected_country: props.selected_country
        };
        console.log(props.selected_country)
    }

    async componentDidMount() {
        this.getDataForDisplay(1);
    }

    async getDataForDisplay(e) {
        console.log(e)
        this.setState({ showProgress: true }, async function () {
            let pageNumber = (e - 1) * 6;
            let countryResult = await backend.get_movies_based_on_countries(this.state.selected_country, pageNumber);
            console.log(countryResult.rows)
            this.setState({
                showProgress: false,
                randomMovies: countryResult.rows,
                length: getPageCount(countryResult.row_count, PAGE_SIZE)
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
                                {e.country.split(',').map((g, i) => (
                                    <Typography key={i} variant="caption" style={{ border: 'solid 1px black', borderRadius: 6, padding: 6, marginRight: 10 }}>
                                        {g}
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

export default GenreResult;