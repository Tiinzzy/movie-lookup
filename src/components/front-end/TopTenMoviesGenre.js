import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class TopTenMoviesGenre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGenre: '- ALL -'
        };
    }

    async componentDidMount() {
        let genres = await backend.get_all_movie_genres();
        genres = genres.map(e => e.genre_name).sort();
        genres.unshift(this.state.selectedGenre);
        this.setState({ genres });
    }

    handleChange(e) {
        this.setState({ selectedGenre: e.target.value })
    }

    render() {
        return (
            <Box>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                        value={this.state.selectedGenre}
                        onChange={(e) => this.handleChange(e)}>
                        {this.state.genres && this.state.genres.map((e, i) =>
                            <MenuItem key={i} value={e}>{e}</MenuItem>)}
                    </Select>
                </FormControl>

            </Box>
        );
    }
}

export default TopTenMoviesGenre;