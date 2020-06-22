import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import {
    Typography,
    Card,
    CardMedia
} from '@material-ui/core';

import useWindowDimention from '../hooks/useWindowsDimention';

import Magazin3 from '../assets/magazin3.jpg';

import ContactForm from '../components/Form/ContactForm';


import useContact from '../hooks/useContact'


const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: 0,
        backgroundColor: theme.palette.background.default
    },
    media: {
        height: props => props.height - 20,
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
        fontSize: '60px',
        fontWeight: 600
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
                    <Typography color="primary" className={classes.title}>
                        Contact Me
                    </Typography>
                    <Typography color="primary" variant="h5" style={{ fontWeight: 600 }}>
                        Saba Israel
                    </Typography>
                </div>
            </Card>
            <ContactForm createNewContact={createNewContact} loading={loading} errorMessage={errorMessage} success={success} />
        </div>
    )
}



export default ContactScreen;
