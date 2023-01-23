import React from "react";

import Box from "@mui/material/Box";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import IconButton from '@mui/material/IconButton';
import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import DialogTitle from "@mui/material/DialogTitle";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

class RateMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            value: 0,
            id: props.id,
            submittedValue: 0
        };

        this.openRatingMovie = this.openRatingMovie.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.selectRating = this.selectRating.bind(this);
        this.submitRating = this.submitRating.bind(this);
    }

    componentDidMount() {
        let that = this;
        backend.get_selected_movie(this.state.id, (data) => {
            that.setState({ title: data[0].title });
        });
    }

    openRatingMovie() {
        this.setState({ openDialog: true });
    }

    closeDialog() {
        this.setState({ openDialog: false });
    }

    selectRating(e) {
        this.setState({ value: e });
    }

    submitRating(e) {
        this.setState({ submittedValue: e, openDialog: false }, function () {
            let that = this;
            backend.submit_rating(this.state.submittedValue, function (data) {
                that.setState({});
            });
        });
    }

    render() {
        return (
            <>
                <Box id="movie-rating-star">
                    <IconButton onClick={() => this.openRatingMovie()}>
                        <StarHalfIcon fontSize="large" id="RateMovieRatingStar" />
                    </IconButton>

                    <Dialog open={this.state.openDialog} onClose={() => this.closeDialog()}>
                        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', paddingTop: 5, paddingRight: 5 }}>
                            <IconButton onClick={() => this.closeDialog()}>
                                <HighlightOffIcon />
                            </IconButton>
                        </Box>
                        <DialogTitle>
                            <Typography style={{ textAlign: 'center', fontSize: 18 }}>Rate</Typography>
                            <Typography style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>{this.state.title}</Typography>
                        </DialogTitle>
                        <Divider mt={1} mb={1} />
                        <DialogContent>
                            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Rating
                                        name="customized-10"
                                        value={this.state.value}
                                        max={10}
                                        onChange={(e, i) => this.selectRating(i)}
                                    />
                                    <Button variant="contained" id="SubmitRatingButton" onClick={() => this.submitRating(this.state.value)}>Rate</Button>
                                </Box>
                            </Box>
                        </DialogContent>
                    </Dialog>

                </Box>
            </>
        );
    }
}

export default RateMovie;