import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SnackBar from '../SnackBar/SnackBar';

import {
    TextField,
    Typography,
    Button,
    Container,
    LinearProgress
} from '@material-ui/core';

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
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const OrderForm = (props) => {

    const classes = useStyles();
    const [openSnack,setOpenSnack] = useState(false);

    const {
        createNewOrder,
        loading,
        errorMessage,
        success,
        total
    } = props;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setMobile] = useState('');
    const [address, setAddress] = useState('');

    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    const initForm = () => {
        setEmail('');
        setName('');
        setMobile('');
        setAddress('');
        setError('');
        setErrorEmail('');
    }

    const submitValidator = () => {
        setError('');
        setErrorEmail('');
        if (!validateEmail(email)) {
            setErrorEmail('email not valid ');
        }
        else if (name !== '' && phone !== '' && address!== ''
        ) {
            createNewOrder({ email, name, phone, address });
            initForm();
        } else {
            setError('All input required ');
        }
    }
    
    React.useEffect(()=>{
        if(success){
            setOpenSnack(true)
        }
    },[success]);


    return (
        <div className={classes.paper}>
            <Container component="main" maxWidth="xs" >
                {loading && <LinearProgress />}
                <SnackBar open={openSnack} success={success} handleClose={() => setOpenSnack(false)} message="success update menu" />
                {/* <Typography component="h1" variant="h5">
                        Contact Me
                    </Typography> */}
                <form className={classes.form} noValidate >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Your Name"
                        name="name"
                        autoComplete="name"
                        color="secondary"
                        autoFocus
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        error={errorEmail !== ''}
                        helperText={errorEmail !== '' ? "Incorrect email." : null}
                        name="name"
                        autoComplete="name"
                        autoFocus
                        color="secondary"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Mobile"
                        name="mobile"
                        autoComplete="mobile"
                        color="secondary"
                        autoFocus
                        value={phone}
                        onChange={(event) => setMobile(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        color="secondary"
                        name="address"
                        autoComplete="address"
                        autoFocus
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                    {
                        (error || errorMessage) ?
                            <Typography component="h1" variant="h5" color="error">
                                {error} {errorMessage}
                            </Typography>
                            : null
                    }
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => { submitValidator() }}
                    >
                        Check order Total price {total} ₪
                        </Button>
                </form>

            </Container>
        </div>
    )
};

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


export default OrderForm;