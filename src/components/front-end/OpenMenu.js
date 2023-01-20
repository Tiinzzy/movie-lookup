import * as React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';
import PublicIcon from '@mui/icons-material/Public';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import GTranslateIcon from '@mui/icons-material/GTranslate';

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
            <Box className='OpenMenuMainBox'>
                <Box className='OpenMenuDataBox'>
                    <Box className='OpenMenCountBox'>
                        <Typography variant='h5' fontWeight="bolder" color="#F5C518" mt={1}>
                            <span style={{ marginRight: 5}}>  < PublicIcon fontSize='medium'/> </span>
                            Production Country
                        </Typography>
                        <Box className="OpenMenuEachItemsBox">
                            {this.state.countries && this.state.countries.map(e => e.charAt(0).toUpperCase() + e.slice(1)).map((e, i) =>
                                <ul key={i} className="no-bullets">
                                    <li className='OpenMenuEachLinkItem' onClick={() => this.countryClicked(e)}>{e}</li>
                                </ul>)}
                        </Box>
                    </Box>
                    <Box className='OpenMenGenrBox'>
                        <Typography variant='h5' fontWeight="bolder" color="#F5C518" mt={1}>
                            <span style={{ marginRight: 10 }}> <TheaterComedyIcon fontSize='medium'/></span>
                            Genre
                        </Typography>
                        <Box className="OpenMenuEachItemsBox">
                            {this.state.genres && this.state.genres.map(e => e.charAt(0).toUpperCase() + e.slice(1)).map((e, i) =>
                                <ul key={i} className="no-bullets">
                                    <li className='OpenMenuEachLinkItem' onClick={() => this.genreClicked(e)}>{e}</li>
                                </ul>)}
                        </Box>
                    </Box>
                    <Box className='OpenMenLangBox'>
                        <Typography variant='h5' fontWeight="bolder" color="#F5C518" mt={1}>
                            <span style={{ marginRight: 10 }}><GTranslateIcon fontSize='medium'/></span>
                            Available Languages
                        </Typography>
                        <Box className="OpenMenuEachItemsBox">
                            {this.state.languages && this.state.languages.map(e => e.charAt(0).toUpperCase() + e.slice(1)).map((e, i) =>
                                <ul key={i} className="no-bullets">
                                    <li className='OpenMenuEachLinkItem' onClick={() => this.languageClicked(e)}>{e}</li>
                                </ul>)}
                        </Box>
                    </Box>
                </Box>
                <Box className='OpenMenuButtonBox'>
                    <IconButton onClick={() => this.closeMenu()} size="large">
                        <HighlightOffIcon fontSize="large" color="inherit" />
                    </IconButton>
                </Box>
            </Box>
        );
    }
}

export default OpenMenu;