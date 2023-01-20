import React from "react";

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import './style.css';

const MY_ADS = new Array("images/pic1.jpeg", "images/pic10.webp", "images/pic11.webp", "images/pic12.webp", "images/pic15.webp", "images/pic16.webp");

const AD_CHANGE_INTERVAL = 8000;

class Advertisement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            in: true,
            randomAd: 0
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ in: false }, function () {
                let randomPic = Math.floor(Math.random() * MY_ADS.length);
                if (this.state.randomAd === randomPic) {
                    randomPic = (this.state.randomAd + 1) % MY_ADS.length;
                }
                let that = this;
                window.setTimeout(function() {
                    that.setState({ in: true, randomAd: randomPic });
                }, 900);                
            });
        }, AD_CHANGE_INTERVAL);
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                <Fade direction="down" in={this.state.in} timeout={500}>
                    <a href="https://www.shoppersdrugmart.ca/en" target="_blank">
                        <img src={MY_ADS[this.state.randomAd]} width="1000" alt="#" style={{ border: 'solid 1px #eaeaea', animation: 'fadeIn 5s' }} />
                    </a>
                </Fade>
            </Box>
        );
    }
}
export default Advertisement;