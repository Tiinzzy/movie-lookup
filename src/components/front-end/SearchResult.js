import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from '@mui/icons-material/Star';

import './style.css';

const GENRES = ['Animation', 'Comedy', 'Family', 'Adventure'];

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', margin: 25 }}>
                <Box style={{ display: 'flex', flexDirection: 'row', marginBottom: 12 }}>
                    <Typography variant="h3" fontWeight="bold" fontSize="35px" >
                        Toy Story
                    </Typography>
                    <Box style={{ marginLeft: 20, display: 'flex', alignItems: 'center', fontSize: "20px", alignContent: 'center', alignSelf: 'center' }}>
                        <span style={{ color: '#F5C518' }}><StarIcon fontSize="large" /></span>
                        <span>8.3/</span><span style={{ fontSize: 16 }}>10</span>
                    </Box>
                </Box>

                <Box style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderBottom: 'solid 1px rgb(87, 86, 86)', paddingBottom: 15 }}>
                    <Typography variant="body2" mt={1} mr={1}>
                        1995-10-30
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                        |
                    </Typography>
                    <Typography variant="body2" mt={1} mr={1}>
                        1h 35m
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                        |
                    </Typography>
                    <Typography variant="body2" mt={1} mr={1}>
                        English
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                        |
                    </Typography>
                    <Typography variant="body2" mt={1} mr={1}>
                        Released
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" mt={1} mr={1}>
                        |
                    </Typography>
                    <Box marginTop="12px">
                        <a href={'https://www.imdb.com/title/tt0114709'} target="_blank">
                            <img src="/imdb.png" height="20" alt="#" />
                        </a>
                    </Box>
                </Box>

                <Box style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    {GENRES.map((e, i) =>
                        <Typography key={i} mr={1} style={{ border: 'solid 1px rgb(87, 86, 86)', padding: 8, borderRadius: 30, fontSize: 12 }}>{e}</Typography>)}
                </Box>

                <Typography variant="body1" mt={2}>
                    Led by Woody, Andy''s toys live happily in his room until Andy''s birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy''s heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.
                </Typography>
            </Box>
        );
    }
}

export default SearchResult;