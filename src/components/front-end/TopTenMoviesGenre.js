import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import BackEndConnection from './BackEndConnection';
import { shared } from './functions';

const backend = BackEndConnection.INSTANCE();

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

    componentDidMount() {
        let that = this;
        backend.get_all_movie_genres((data) => {
            data.unshift({ genre_name: '- ALL -', count: data.map(d => d.count).reduce((a, b) => a + b, 0) });
            that.setState({ genres: data });
        });

    }

    handleChange(e) {
        this.setState({ selectedGenre: e.target.value });
        shared.callSideBarMovies({ action: 'genre-has-been-selected', data: e.target.value });
    }

    render() {
        return (
            <>
                <FormControl sx={{ mb: 2, minWidth: 120 }} size="small">
                    {this.state.genres && <Select
                        title={this.state.selectedGenre}
                        value={this.state.selectedGenre}
                        onChange={(e) => this.handleChange(e)}>
                        {this.state.genres.map((e, i) =>
                            <MenuItem key={i} value={e.genre_name} title={e.genre_name}>
                                {e.genre_name}<span style={{ marginLeft: 5, color: '#bbb' }}>({e.count})</span>
                            </MenuItem>)}
                    </Select>}
                </FormControl>
            </>
        );
    }
}

export default TopTenMoviesGenre;