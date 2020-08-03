import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import {
    Typography,
    Card,
    CardMedia
} from '@material-ui/core';

import useWindowDimention from '../hooks/useWindowsDimention';

import magazin2 from '../assets/magazin2.jpg';

import map from '../assets/map.png';

import magazin5 from '../assets/magazin5.jpeg';
import magazin6 from '../assets/magazin6.jpeg';
import magazin7 from '../assets/magazin7.jpeg';
import magazin8 from '../assets/magazin8.jpeg';

import { withNamespaces } from 'react-i18next';

import CarouselComponent from '../components/Carousel/CarouselComponent';


const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: 0,
        backgroundColor: theme.palette.background.default
    },
    media: {
        height:  '40vh',
    },
    card: {
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        width: props => props.width,
        height:  '40vh',
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
        color: '#FFF',
        fontSize: '65px',
        fontWeight: 600
    },
    subTitle: {
        position: 'absolute',
        width: props => props.width,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        bottom: 0,
        left: 0,
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
                <CardMedia image={magazin2} className={classes.media} />
                <div className={classes.overlay}>
                    <Typography color="primary" className={classes.title}>
                      {props.t("About")}
                    </Typography>
                    <div className={classes.subTitle}>
                    <Typography  align="center" variant="h6" style={{ fontWeight: 600  , color: '#FFF' }} >
                    {props.t("Agripas 69 , Jerusalem ")}
                    </Typography>
                </div>
                </div>
            </Card>
            <CardMedia image={map} className={classes.media} />
            <CarouselComponent />

        </div>
    )
}



export default withNamespaces()(AboutScreen);
