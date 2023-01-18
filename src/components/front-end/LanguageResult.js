import React from "react";

import Box from "@mui/material/Box";

import './style.css';

function getPageCount(rowCount, pageSize) {
    let pageCount = Math.floor(rowCount / pageSize);
    if (pageCount * pageSize < rowCount) {
        pageCount += 1;
    }
    return pageCount;
}


class LanguageResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_language: props.selected_language
        };
    }



    render() {
        return (
            <Box>
                
            </Box>
        );
    }
}

export default LanguageResult;