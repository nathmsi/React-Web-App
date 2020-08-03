import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import {
    Typography,
    Card,
    CardMedia,
    Container
} from '@material-ui/core';

import useWindowDimention from '../hooks/useWindowsDimention';

import Magazin3 from '../assets/magazin3.jpg';


import Magazin5 from '../assets/magazin5.jpeg';

import ContactForm from '../components/Form/ContactForm';


import useContact from '../hooks/useContact'
import { withNamespaces } from 'react-i18next';


const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: 0,
        backgroundColor: theme.palette.background.default
    },
    media: {
        height: '40vh',
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
        // alignItems: 'center',
        // alignContent: 'center',
        top: 0,
        left: 0,
    },
    title: {
        color: '#FFF',
        fontSize: '60px',
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



const ContactScreen = (props) => {
    const {
        width,
        height
    } = useWindowDimention();
    const contentHeight = (height) / 2
    const classes = useStyles({ width, height: contentHeight });


    const {
        createNewContact,
        loading,
        errorMessage,
        success
    } = useContact();





    return (
        <div className={classes.content}>
            <Card className={classes.card}>
                <CardMedia image={Magazin3} className={classes.media} />
                <div className={classes.overlay}>
                    <Typography color="primary" align="center" className={classes.title}>
                        {props.t("Saba Israel")}
                    </Typography>
                </div>
            </Card>
            <ContactForm createNewContact={createNewContact} loading={loading} errorMessage={errorMessage} success={success} />
        </div>
    )
}



export default withNamespaces()(ContactScreen);
