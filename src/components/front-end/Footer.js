import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Box style={{borderTop: 'solid 2px rgb(60, 60, 60)', textAlign:'center', color:'gray', paddingTop:10, margin: '150px 50px 5px 50px', fontSize:'8px'}}>
                <Typography variant="caption">
                    Designed by Tina Vatanabadi, Copyright 2023
                </Typography>
            </Box>
        );
    }
}
export default Footer;