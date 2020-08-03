import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { withNamespaces } from 'react-i18next';
import Paper from '@material-ui/core/Paper';




const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp(props) {
    const classes = useStyles();

    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [errorInput, setErrorInput] = React.useState('');
    const [incorectEmail, setIncorectEmail] = React.useState('');
    const [incorectPassword, setIncorectPassword] = React.useState('');

    const {
        errorMessage,
        createUser,
        ChangeScreen
    } = props;

    const handleSubmit = () => {
        setErrorInput("");
        setIncorectEmail("");
        setIncorectPassword("");
        if (name !== "" && password !== "") {
            if (validateEmail(email)) {
                if (password.length >= 6) {
                    createUser({ email, password, name });
                } else {
                    setIncorectPassword('Password must be length >= 6');
                }
            } else {
                setIncorectEmail('Incorect Email ');
            }
        } else {
            setErrorInput("Input name and password required");
        }
    }





    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {props.t("Sign Up")}
            </Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label={props.t("Your Name")}
                            autoFocus
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label={props.t("Last Name")}
                            name="lastName"
                            autoComplete="lname"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            label={props.t("Email")}
                            name="email"
                            autoComplete="email"
                            error={incorectEmail !== ''}
                            helperText={incorectEmail !== '' ? "Incorrect email." : null}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label={props.t("Password")}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={incorectPassword !== ''}
                            helperText={incorectPassword !== '' ? "Incorrect email." : null}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Grid>
                </Grid>
                {
                    (errorInput || errorMessage) &&
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Typography color="error">
                                {errorInput} {errorMessage}
                            </Typography>
                        </Grid>
                    </Grid>
                }
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    style={{ textTransform: 'none' }}
                    onClick={() => handleSubmit()}
                >
                    {props.t("Sign Up")}
                </Button>

                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={ChangeScreen} style={{ textTransform: 'none' }} >
                            {props.t("Already have an account? Sign in")}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export default withNamespaces()(SignUp);