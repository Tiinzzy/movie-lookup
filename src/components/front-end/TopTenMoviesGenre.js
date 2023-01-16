import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();
const GENRE_LENGTH = 8;

function niceSize(t) {
    if (t.length < GENRE_LENGTH) {
        return t;
    } else {
        return t.substring(0, GENRE_LENGTH) + ' ...'
    }
}

class TopTenMoviesGenre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGenre: '- ALL -',
            anchorEl: null,
            open: false
        };
        this.handleChange = this.handleChange.bind(this);
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
            <>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                        style={{width: '120px'}}
                        title={this.state.selectedGenre}
                        value={this.state.selectedGenre}
                        onChange={(e) => this.handleChange(e)}>
                        {this.state.genres && this.state.genres.map((e, i) =>
                            <MenuItem key={i} value={e} title={e}>{niceSize(e)}</MenuItem>)}
                    </Select>
                </FormControl>
            </>
        );
    }
}

export default TopTenMoviesGenre;