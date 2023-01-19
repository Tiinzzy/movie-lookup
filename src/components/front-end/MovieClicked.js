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
        console.log(data[0])
        this.setState({
            language: data[0].language.toUpperCase(),
            vote: data[0].vote_average,
            title: data[0].title, status: data[0].status,
            time: data[0].runtime, date: data[0].release_date,
            overview: data[0].overview, lang: data[0].original_language.toUpperCase(),
            imdb: data[0].imdb, genre: data[0].genres
        });

        let pc = await backend.if_production_country(this.state.movie_id);
        this.setState({ countries: pc[0].countries.split(',') });

        let al = await backend.if_spoken_languages(this.state.movie_id);
        this.setState({ languages: al[0].languages.split(',') });

        let prc = await backend.if_production_company(this.state.movie_id);
        this.setState({ company: prc[0].company.split(',') });
    }

    render() {
        return (
            <Box style={{ padding: '20px', width: 1000, height: 800, border: 'solid 0px red', margin: 'auto' }}>
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
                            {this.state.language}
                            <span style={{ paddingLeft: 5 }}>
                                ({this.state.lang})
                            </span>
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
                            <a key={i} href={'/genre-result?selected_genre=' + e} className="GenreLink"> <Typography mr={1} style={{ border: 'solid 1px rgb(87, 86, 86)', padding: 8, borderRadius: 30, fontSize: 12 }}>
                                {e}</Typography>
                            </a>
                        )}
                    </Box>
                    <Typography variant="body1" mt={2}>
                        {this.state.overview}
                    </Typography>
                    <Box style={{ display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center', fontSize: 14, alignContent: 'center' }}>
                        <Typography style={{ fontWeight: 'bold', marginRight: 6, marginTop: 10 }}>Production Countries:</Typography>
                        {this.state.countries && this.state.countries.map((e, i) =>
                            <Typography fontSize={15} key={i} style={{ marginRight: 4, marginTop: 10 }}>
                                <a href={'/country-result?selected_country=' + e} className="linkedClass"> {e}</a>
                            </Typography>)}
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center', fontSize: 14, alignContent: 'center' }}>
                        <Typography style={{ fontWeight: 'bold', marginRight: 6, marginTop: 10 }}>Available in:</Typography>
                        {this.state.languages && this.state.languages.map((e, i) =>
                            <Typography fontSize={15} key={i} style={{ marginRight: 4, marginTop: 10 }}>
                                <a href={'/language-result?selected_language=' + e} className="linkedClass">{e}</a>
                            </Typography>)}
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center', fontSize: 14, alignContent: 'center' }}>
                        <Typography style={{ fontWeight: 'bold', marginRight: 6, marginTop: 10 }}>Production Company:</Typography>
                        {this.state.company && this.state.company.map((e, i) =>
                            <Typography fontSize={15} key={i} style={{ marginRight: 8, marginTop: 10 }}>
                                {e}
                            </Typography>)}
                    </Box>
                </Box>
            </Box >
        );
    }
}

export default MovieClicked;