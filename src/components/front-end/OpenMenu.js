import * as React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';

import BackEndConnection from './BackEndConnection';
import { shared } from './functions';

import './style.css';

const backend = BackEndConnection.INSTANCE();

class OpenMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.closeMenu = this.closeMenu.bind(this);
        this.genreClicked = this.genreClicked.bind(this);
        this.countryClicked = this.countryClicked.bind(this);
        this.languageClicked = this.languageClicked.bind(this);
    }


    async componentDidMount() {
        let genres = await backend.get_all_movie_genres();
        genres = genres.map(e => e.genre_name).sort();

        let languages = await backend.get_spoken_languages();
        languages = languages.map(e => e.languages).sort().filter(e => e !== '' && e !== "?????" && e !== "??????" && e !== "No Language");

        let countries = await backend.get_production_countries();
        countries = countries.map(e => e.countries).sort();

        this.setState({ genres, languages, countries });
    }

    closeMenu() {
        shared.callHeaderMenu({ action: 'close_button_clicked' });
    }

    async genreClicked(e) {
        let genreMovies = await backend.get_movies_based_on_genres(e);
        // console.log(genreMovies);
    }

    async countryClicked(e) {
        let countryMovies = await backend.get_movies_based_on_countries(e)
        // console.log(countryMovies);
    }
    async languageClicked(e) {
        let languageMovies = await backend.get_movies_based_on_spoken_languages(e);
        // console.log(languageMovies);
    }

    render() {
        return (
            <Box style={{ width: 1300, height: 900, backgroundColor: '#333433', border: 'none', borderRadius: 6, display: 'flex', flexDirection: 'row', overflowY: 'scroll' }}>
                <Box style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                    <Box style={{ padding: 40 }}>
                        <Typography variant='h5' fontSize="bold" color="#F5C518">
                            Country
                        </Typography>
                        <Box color='white' mt={2}>
                            {this.state.countries && this.state.countries.map((e, i) =>
                                <li style={{ marginBottom: 10, cursor: 'pointer' }} key={i} onClick={() => this.countryClicked(e)}>{e}</li>)}
                        </Box>
                    </Box>
                    <Box style={{ padding: 40 }}>
                        <Typography variant='h5' fontSize="bold" color="#F5C518">
                            Genre
                        </Typography>
                        <Box color='white' mt={2}>
                            {this.state.genres && this.state.genres.map((e, i) =>
                                <li style={{ marginBottom: 10, cursor: 'pointer' }} key={i} onClick={() => this.genreClicked(e)}>{e}</li>)}
                        </Box>
                    </Box>
                    <Box style={{ padding: 40 }}>
                        <Typography variant='h5' fontSize="bold" color="#F5C518">
                            Language
                        </Typography>
                        <Box color='white' mt={2}>
                            {this.state.languages && this.state.languages.map((e, i) =>
                                <li style={{ marginBottom: 10, cursor: 'pointer' }} key={i} onClick={() => this.languageClicked(e)}>{e}</li>)}
                        </Box>
                    </Box>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'column', height: 50, marginTop: 5, marginLeft: 'auto' }}>
                    <IconButton onClick={() => this.closeMenu()} size="large">
                        <HighlightOffIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
        );
    }
}

export default OpenMenu;