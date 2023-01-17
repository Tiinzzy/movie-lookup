import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

class MovieClicked extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_id: props.movie_id
        };

    }
    async componentDidMount() {
        let data = await backend.get_selected_movie(this.state.movie_id);
        this.setState({
            vote: data[0].vote_average,
            title: data[0].title, status: data[0].status,
            time: data[0].runtime, date: data[0].release_date,
            overview: data[0].overview, lang: data[0].original_language.toUpperCase(),
            imdb: data[0].imdb, genre: data[0].genres
        });

    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', margin: 25 }}>
                <Box style={{ display: 'flex', flexDirection: 'row', marginBottom: 12 }}>
                    <Typography variant="h3" fontWeight="bold" fontSize="35px" >
                        {this.state.title}
                    </Typography>
                    <Box style={{ marginLeft: 20, display: 'flex', alignItems: 'center', fontSize: "20px", alignContent: 'center', alignSelf: 'center' }}>
                        <span style={{ color: '#F5C518' }}><StarIcon fontSize="large" /></span>
                        <span>{this.state.vote}/</span><span style={{ fontSize: 16 }}>10</span>
                    </Box>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderBottom: 'solid 1px rgb(87, 86, 86)', paddingBottom: 15 }}>
                    <Typography variant="body2" mt={1} mr={1}>
                        {this.state.date}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                        |
                    </Typography>
                    <Typography variant="body2" mt={1} mr={1}>
                        {this.state.time} min
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                        |
                    </Typography>
                    <Typography variant="body2" mt={1} mr={1}>
                        {this.state.lang}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                        |
                    </Typography>
                    <Typography variant="body2" mt={1} mr={1}>
                        {this.state.status}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                        |
                    </Typography>
                    <Box marginTop="12px">
                        <a href={'https://www.imdb.com/title/' + this.state.imdb} target="_blank">
                            <img src="/imdb.png" height="20" alt="#" />
                        </a>
                    </Box>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    {this.state.genre && this.state.genre.map((e, i) =>
                        <Typography key={i} mr={1} style={{ border: 'solid 1px rgb(87, 86, 86)', padding: 8, borderRadius: 30, fontSize: 12 }}>{e}</Typography>)}
                </Box>
                <Typography variant="body1" mt={2}>
                    {this.state.overview}
                </Typography>
            </Box>
        );
    }
}

export default MovieClicked;