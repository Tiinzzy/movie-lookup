import React from "react";

import Box from "@mui/material/Box";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from "@mui/material/Button";

import './style.css';

class GetPdf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.downloadMoviePdf = this.downloadMoviePdf.bind(this);
    }

    downloadMoviePdf() {
        console.log('clicked')
    }

    render() {
        return (
            <Box mt={1} style={{ marginLeft: 'auto' }} >
                <Button color='inherit' variant="contained" onClick={() => this.downloadMoviePdf()} startIcon={<FileDownloadIcon />}>Download</Button>
            </Box>
        );
    }
}

export default GetPdf;