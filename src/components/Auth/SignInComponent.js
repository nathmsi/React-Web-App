


import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



import { withNamespaces } from 'react-i18next';




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

function LoginScreen(props) {

    const classes = useStyles();

    const {
        errorMessage,
        loginUser,
        ChangeScreen
    } = props;


    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleSignIn = () => {
        console.log('handleSignIn', email);
        loginUser({
            email, password
        });
    }

    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {props.t("Sign in")}
            </Typography>
            <form className={classes.form} noValidate >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={props.t("Email")}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={props.t("Password")}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                {
                    errorMessage ?
                        <Typography component="h1" variant="h5" color="error">
                            {errorMessage}
                        </Typography>
                        : null
                }
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    style={{ textTransform: 'none' }}
                    onClick={handleSignIn}
                >
                    {props.t("Sign In")}
                </Button>
            </form>
            <Grid container justify="flex-end">
                <Grid item>
                    <Button onClick={ChangeScreen} style={{ textTransform: 'none' }} >
                        {props.t("Don't have an account? Sign up")}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default withNamespaces()(LoginScreen);