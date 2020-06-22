import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import {
    Typography,
    Card,
    CardMedia
} from '@material-ui/core';

import useWindowDimention from '../hooks/useWindowsDimention';

import Magazin1 from '../assets/magazin2.jpg';



const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: 0,
        backgroundColor: theme.palette.background.default
    },
    media: {
        height: props => props.height,
    },
    card: {
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        width: props => props.width,
        height: props => props.height,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        top: 0,
        left: 0,
    },
    title: {
        fontSize: '65px',
        fontWeight: 600
    }
}));


const AboutScreen = (props) => {
    const {
        width,
        height
    } = useWindowDimention();
    const contentHeight = (height ) / 2
    const classes = useStyles({ width, height : contentHeight });



    return (
        <div className={classes.content}>
            <Card className={classes.card}>
                <CardMedia image={Magazin1} className={classes.media} />
                <div className={classes.overlay}>
                    <Typography color="primary" className={classes.title}>
                        About
                    </Typography>
                    <Typography color="primary" >
                        
                    </Typography>
                </div>
            </Card>
            <iframe width="100%" height={contentHeight - 20} frameBorder="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1695.7562059827264!2d35.212484535304704!3d31.78378214880525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502d62837961f95%3A0xd3f9d1148b164446!2sAgripas%20St%2069%2C%20Jerusalem!5e0!3m2!1sfr!2sil!4v1585495183413!5m2!1sfr!2sil"  ></iframe>
        </div>
    )
}



export default AboutScreen;
