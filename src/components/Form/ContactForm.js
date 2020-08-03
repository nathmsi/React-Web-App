import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SnackBar from '../SnackBar/SnackBar';

import {
    TextField,
    Typography,
    Button,
    Container,
    LinearProgress,
    Icon
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(0),
    },
    form: {
        //width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignContent: 'center',
    },
    item: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    button: {
        margin: theme.spacing(1, 0, 1),
    },
    subTitle: {
        marginTop: 10
    }
}));

const ContactForm = (props) => {

    const classes = useStyles();
    const [openSnack, setOpenSnack] = useState(false);

    const {
        createNewContact,
        loading,
        errorMessage,
        success
    } = props;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    const initForm = () => {
        setEmail('');
        setName('');
        setMobile('');
        setSubject('');
        setMessage('');
        setError('');
        setErrorEmail('');
    }

    const submitValidator = () => {
        setError('');
        setErrorEmail('');
        if (!validateEmail(email)) {
            setErrorEmail('email not valid ');
        }
        else if (name !== '' && mobile !== '' && subject !== '' && message !== ''
        ) {
            createNewContact({ email, name, mobile, subject, message });
            initForm();
        } else {
            setError('All input required ');
        }
    }

    React.useEffect(() => {
        if (success) {
            setOpenSnack(true)
        }
    }, [success]);


    return (
        <div className={classes.paper}>
            <Container component="main" maxWidth="md" >
                {loading && <LinearProgress />}
                <SnackBar open={openSnack} success={success} handleClose={() => setOpenSnack(false)} message="success update menu" />
                {/* <Typography component="h1" variant="h5">
                        Contact Me
                    </Typography> */}
                <div className={classes.subTitle}>
                    <Typography color="primary" align="center" variant="h4" style={{ fontWeight: 600 }}>
                        {props.t("Contact Me")}
                    </Typography>
                </div>
                <form className={classes.form} noValidate >
                    <div className={classes.item} >
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            margin="dense"
                            id="name"
                            label={props.t("Your Name")}
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            margin="dense"
                            id="email"
                            label={props.t("Email")}
                            error={errorEmail !== ''}
                            helperText={errorEmail !== '' ? props.t("Incorrect email") : null}
                            name="name"
                            autoComplete="name"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="mobile"
                            label={props.t("Mobile")}
                            name="mobile"
                            autoComplete="mobile"
                            value={mobile}
                            onChange={(event) => setMobile(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="subject"
                            label={props.t("Subject")}
                            name="subject"
                            autoComplete="subject"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                        />
                    </div>
                    <div >
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="message"
                            label={props.t("Your Message")}
                            name="message"
                            autoComplete="message"
                            multiline
                            rows={2}
                            rowsMax={4}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                        {
                            (error || errorMessage) ?
                                <Typography component="h1" variant="h5" color="error">
                                    {error} {errorMessage}
                                </Typography>
                                : null
                        }
                        <Button
                            variant="contained"
                            fullWidth
                            className={classes.button}
                            onClick={() => { submitValidator() }}
                        >
                            {props.t("Send")}
                         </Button>
                    </div>
                </form>

            </Container>
        </div>
    )
};

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


export default withNamespaces()(ContactForm);
