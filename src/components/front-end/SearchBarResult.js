import React from "react";

import Box from "@mui/material/Box";

import './style.css';

class SearchBarResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searched_item: props.searched_item
        };
    }

    render() {
        return (
            <Box>

            </Box>
        );
    }
}

export default SearchBarResult;