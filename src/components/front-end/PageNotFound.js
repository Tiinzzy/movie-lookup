import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

class PageNotFound extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Box>
                <Box style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'center',
                    margin: '200px auto auto auto', alignContent: 'center', alignItems: 'center'
                }}>
                    <Typography variant="h3" fontWeight="bolder" fontSize="100px" mr={5} style={{ textShadow: '#f0f0f0 10px 12px' }}>
                        404
                    </Typography>
                    <img src="/sad.svg" height="125" alt="#" />
                </Box>
                <Box style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    margin: 'auto auto auto auto', alignContent: 'center', alignItems: 'center'
                }}>
                    <Typography variant="h5" fontWeight="bolder" fontSize="50px" mr={5} style={{ textShadow: '#f0f0f0 10px 12px' }}>
                        Page Not Found!
                    </Typography>
                    <Typography variant="body2" fontSize="20px" mr={5} mt={2}>
                        The Page you're looking for doesn't exist or an error occured.
                    </Typography>
                    <Typography variant="body2" fontSize="20px" mr={5}>
                        Go back, or choose a new direction.
                    </Typography>
                </Box>
            </Box>
        );
    }
}
export default PageNotFound;