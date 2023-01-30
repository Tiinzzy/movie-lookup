import React from "react";

import Box from "@mui/material/Box";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from "@mui/material/Button";

import './style.css';

class GetPdf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id

        };
        this.downloadMoviePdf = this.downloadMoviePdf.bind(this);
    }

    downloadMoviePdf() {
        let url = 'http://localhost:3333/download?id=' + this.state.id;
        var link = document.createElement('a');
        link.href = url;
        link.download = 'file.pdf';
        console.log(link);
        link.dispatchEvent(new MouseEvent('click'));
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