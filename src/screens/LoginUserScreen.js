


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
import Slide from '@material-ui/core/Slide';



//redux
import { useDispatch, useSelector } from 'react-redux';
import {
    loginUser,
    createUser
} from '../store/actions';

import {
    NavLink,
    useLocation,
    useHistory
} from "react-router-dom";

import { withNamespaces } from 'react-i18next';



import magazin from '../assets/magazin5.jpeg';

import SingInComponent from '../components/Auth/SignInComponent';
import SignUpComponenet from '../components/Auth/SignUpComponenet';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${magazin})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
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
    const dispatch = useDispatch();
    const {
        errorMessage,
        loading,
        isAuth
    } = useSelector(state => state.auth);

    const [isLoginScreen, setLoginScreen] = React.useState(true);

    let history = useHistory();

    React.useEffect(() => {
        if (isAuth) {
            console.log('isAuth');
            history.push('/');
        }
    }, [isAuth]);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            {
                !isLoginScreen &&
                <Slide timeout={2000} direction="left" in={true} mountOnEnter unmountOnExit>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <SignUpComponenet createUser={(obj) => dispatch(createUser(obj))} errorMessage={errorMessage} ChangeScreen={() => setLoginScreen(true)} />
                    </Grid>
                </Slide>
            }
            <Grid item xs={false} sm={4} md={7} />
            {
                isLoginScreen &&
                <Slide timeout={2000} direction="right" in={true} mountOnEnter unmountOnExit>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <SingInComponent loginUser={(obj) => dispatch(loginUser(obj))} errorMessage={errorMessage} ChangeScreen={() => setLoginScreen(false)} />
                    </Grid>
                </Slide>
            }
        </Grid>

    );
}

export default withNamespaces()(LoginScreen);