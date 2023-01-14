import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';

import './style.css';

import BackEndConnection from './BackEndConnection';
const backend = BackEndConnection.INSTANCE();

class SearchResuts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
        let movies = await backend.get_movies();
        console.log(movies);
    }

    render() {
        return (
            <Box className="SearchBox">
                <Box className="PageTitle"> <Typography variant="h5" fontWeight="bold" color="rgb(87, 86, 86)"> Suggested Movies</Typography></Box>


                <Box className="SearchRowBox1">
                    <Box className="SearchColumnBox1">
                        <Box className="SearchTitle">
                            <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>The Godfather (1972)</Typography>
                            <span style={{ color: '#F5C518', paddingLeft: 10, paddingRight: 2 }}><StarIcon /> </span>9.2
                        </Box>
                        <Box className="MovieDetails">
                            <Typography variant="body1">
                                The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Director:</span> Francis Ford Coppola
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Stars:</span> Marlon Brando, Al Pacino, James Caan, Diane Keaton
                            </Typography>
                        </Box>
                    </Box>
                </Box >
                <br />

                <Box className="SearchRowBox">
                    <Box className="SearchColumnBox1" display='flex'>
                        <Box className="SearchTitle">
                            <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>Raging Bull (1980)</Typography>
                            <Box style={{ alignItems: 'center', display: 'flex' }}>
                                <span style={{ color: '#F5C518' }}><StarIcon /> </span>8.2
                            </Box>
                        </Box>
                        <Box className="MovieDetails" flexGrow={1}>
                            <Typography variant="body1">
                                The life of boxer Jake LaMotta, whose violence and temper that led him to the top in the ring destroyed his life outside of it.
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Director:</span> Martin Scorsese
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Stars:</span> Robert De Niro, Cathy Moriarty, Joe Pesci, Frank Vincent
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <br />


                <Box className="SearchRowBox">
                    <Box className="SearchColumnBox1" display='flex'>
                        <Box className="SearchTitle">
                            <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>Schindler's List (1993)</Typography>
                            <Box style={{ alignItems: 'center', display: 'flex' }}>
                                <span style={{ color: '#F5C518' }}><StarIcon /> </span>9
                            </Box>
                        </Box>
                        <Box className="MovieDetails" flexGrow={1}>
                            <Typography variant="body1">
                                In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes
                                concerned for his Jewish workforce after witnessing their persecution by the Nazis.
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Director:</span> Steven Spielberg
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Stars:</span> Liam Neeson, Ralph Fiennes, Ben Kingsley, Caroline Goodall
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <br />
                <Box className="SearchRowBox">
                    <Box className="SearchColumnBox">
                        <Box className="SearchTitle">
                            <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>Casablanca (1942)</Typography>
                            <Box style={{ alignItems: 'center', display: 'flex' }}>
                                <span style={{ color: '#F5C518' }}><StarIcon /> </span>8.5
                            </Box>
                        </Box>
                        <Box className="MovieDetails">
                            <Typography variant="body1">
                                A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Director:</span> Michael Curtiz
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Stars:</span> Humphrey Bogart, Ingrid Bergman, Paul Henreid, Claude Rains
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <br />
                <Box className="SearchRowBox">
                    <Box className="SearchColumnBox">
                        <Box className="SearchTitle">
                            <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>Raging Bull (1980)</Typography>
                            <Box style={{ alignItems: 'center', display: 'flex' }}>
                                <span style={{ color: '#F5C518' }}><StarIcon /> </span>8.2
                            </Box>
                        </Box>
                        <Box className="MovieDetails">
                            <Typography variant="body1">
                                The life of boxer Jake LaMotta, whose violence and temper that led him to the top in the ring destroyed his life outside of it.
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Director:</span> Martin Scorsese
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Stars:</span> Robert De Niro, Cathy Moriarty, Joe Pesci, Frank Vincent
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <br />
                <Box className="SearchRowBox">
                    <Box className="SearchColumnBox">
                        <Box className="SearchTitle">
                            <Typography variant="h6" fontWeight="bold" style={{ display: 'inline-block' }}>Schindler's List (1993)</Typography>
                            <Box style={{ alignItems: 'center', display: 'flex' }}>
                                <span style={{ color: '#F5C518' }}><StarIcon /> </span>9
                            </Box>
                        </Box>
                        <Box className="MovieDetails">
                            <Typography variant="body1">
                                In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Director:</span> Steven Spielberg
                                <br />
                                <span style={{ fontWeight: 'bold' }}>Stars:</span> Liam Neeson, Ralph Fiennes, Ben Kingsley, Caroline Goodall
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default SearchResuts;