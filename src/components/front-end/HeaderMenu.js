import * as React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Backdrop from '@mui/material/Backdrop';

import OpenMenu from './OpenMenu';
import { LISTENERS } from './messaging';

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        LISTENERS.getToCloseMenu().addEventListener('close_button_clicked',
            () => { this.setState({ open: false }) });
    }

    handleClick() {
        this.setState({ open: !(this.state.open) });
    }

    render() {
        return (
            <Box style={{ marginLeft: 15 }} id="header-menu-box">
                <Button
                    style={{ color: "white" }}
                    id="fade-button"
                    onClick={() => this.handleClick()}>
                    <MenuIcon />
                    Menu
                </Button>
                <Backdrop
                    sx={{ color: 'rgb(60, 60, 60)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.open}>
                    <OpenMenu />
                </Backdrop>
            </Box>
        );
    }
}

export default HeaderMenu;
