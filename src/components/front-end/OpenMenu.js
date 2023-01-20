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


    componentDidMount() {
        let that = this;
        backend.get_all_movie_genres((data) => {
            data = data.map(e => e.genre_name).sort();
            that.setState({ genres: data });
        });

        backend.get_spoken_languages((data) => {
            data = data.map(e => e.languages).sort().filter(e => e !== '' && e !== "?????" && e !== "??????" && e !== "No Language");
            that.setState({ languages: data });
        });

        backend.get_production_countries((data) => {
            data = data.map(e => e.countries).sort();
            that.setState({ countries: data });
        });
    }

    closeMenu() {
        shared.callHeaderMenu({ action: 'close_button_clicked' });
    }

    genreClicked(e) {
        window.location = '/genre-result?selected_genre=' + e;
    }

    countryClicked(e) {
        window.location = '/country-result?selected_country=' + e;
    }

    languageClicked(e) {
        window.location = '/language-result?selected_language=' + e;
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