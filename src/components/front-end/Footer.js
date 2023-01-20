import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './style.css';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Box className="FooterMainBox">
                <Typography variant="caption">
                    Designed by Tina Vatanabadi, Copyright 2023
                </Typography>
            </Box>
        );
    }
}
export default Footer;