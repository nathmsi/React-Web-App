import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SnackBar from '../SnackBar/SnackBar';

import {
    TextField,
    Typography,
    Button,
    Container,
    LinearProgress,
    Stepper,
    Step,
    StepLabel,
    StepContent
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
    const [openSnack, setOpenSnack] = useState(false);

    const {
        createNewOrder,
        loading,
        errorMessage,
        success,
        total,
        t
    } = props;

    const [email, setEmail] = useState(props.email);
    const [name, setName] = useState(props.name);
    const [phone, setMobile] = useState('');
    const [address, setAddress] = useState('');

    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorName, setErrorName] = useState('');

    const [activeStep, setActiveStep] = useState(0);

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
        else if (name !== '' && phone !== '' && address !== ''
        ) {
            createNewOrder({ email, name, phone, address });
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

    const validateStep1 = () => {
        setError('');
        setErrorEmail('');
        setErrorName('');
        if (!validateEmail(email) || name === '' ) {
            !validateEmail(email) && setErrorEmail('email not valid ');
            name === ''  && setErrorName('Name required');
        }else{
            handleNext();
        }
    }




    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };



    return (
        <div className={classes.paper}>
            <Container component="main" maxWidth="xs" >
                {loading && <LinearProgress />}
                <SnackBar open={openSnack} success={success} position={{ vertical: 'bottom', horizontal: 'center' }} handleClose={() => setOpenSnack(false)} message="success update menu" />
                <form className={classes.form} noValidate >
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            <Step key={t('Name And Email')}>
                                <StepLabel>{t('Name And Email')}</StepLabel>
                                <StepContent>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label={t("Your Name")}
                                        error={errorName !== ''}
                                        helperText={errorName !== '' ? "name required" : null}
                                        name="name"
                                        autoComplete="name"
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
                                        label={t("Email")}
                                        error={errorEmail !== ''}
                                        helperText={errorEmail !== '' ? "Incorrect email." : null}
                                        name="name"
                                        autoComplete="name"
                                        value={email}
                                        onChange={(event) => {}}
                                    />
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={validateStep1}
                                                className={classes.button}
                                            >
                                                {t('Next')}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                            <Step key={'Mobile And Address'}>
                                <StepLabel>{t('Mobile And Address')}</StepLabel>
                                <StepContent>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="mobile"
                                        label={t("Mobile")}
                                        name="mobile"
                                        autoComplete="mobile"
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
                                        label={t("Address")}
                                        name="address"
                                        autoComplete="address"
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                    />
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                               variant="contained"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.button}
                                            >
                                                {t('Back')}
                                            </Button>
                                            <Button
                                             fullWidth
                                                 variant="contained"
                                                className={classes.submit}
                                                onClick={() => { submitValidator() }}
                                            >
                                                {t('Check Order')} {" "} {total} ₪
                                        </Button>
                                            {
                                                (error || errorMessage) ?
                                                    <Typography component="h1" variant="h5" color="error">
                                                        {error} {errorMessage}
                                                    </Typography>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        </Stepper>
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


export default OrderForm;