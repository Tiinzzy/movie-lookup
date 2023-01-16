import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BackEndConnection from './BackEndConnection';
import { shared } from './functions';

const backend = BackEndConnection.INSTANCE();

const LIST_ITEMS = ['Genre', 'Language', 'Country', 'Release Date', 'Collections', 'Production Company'].sort();

class OpenMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.closeMenu = this.closeMenu.bind(this);
    }


    async componentDidMount() {
        let genres = await backend.get_all_movie_genres();
        genres = genres.map(e => e.genre_name).sort();
        this.setState({ genres });
    }

    closeMenu() {
        shared.callHeaderMenu({action: 'close_button_clicked'});
    }

    render() {
        return (
            <Box style={{ width: 1300, height: 800, backgroundColor: '#333433', border: 'none', borderRadius: 6, display: 'flex', flexDirection: 'column', color: 'white' }}>
                <Box color='red' border='solid 1px red' display='flex' flexDirection='row' onClick={() => this.closeMenu()}>X</Box>
                {LIST_ITEMS.map((e, i) =>
                    <Box key={i} style={{ display: 'flex', flexDirection: 'row', color: '#F5C518', marginRight: 12 }}>
                        <Box style={{ padding: 40 }}>
                            <Typography variant='h5' fontSize="bold">
                                {e}
                            </Typography>
                        </Box>
                    </Box>)}
            </Box>
        );
    }
}

export default OpenMenu;