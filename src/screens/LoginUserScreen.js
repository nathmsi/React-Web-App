import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { LinearProgress } from '@material-ui/core';

//redux
import { connect } from 'react-redux';
import {
    loginUser
} from '../store/actions';

import { useHistory } from "react-router-dom";



function Copyright() {
    return (
        <Typography variant="body2" color="secondary" align="center">
            {'Copyright © '}
                saba-israel{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        marginTop: 53,
        backgroundColor: theme.palette.background.default
    },
    title: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: theme.palette.background.default
    },
}));

const SignIn = (props) => {
    let history = useHistory();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {
        errorMessage,
        loading,
        isAuth
    } = props;

    const handleSignIn = () => {
        console.log('handleSignIn', email, name);
        props.loginUser({
            email, password
        })
    }

    React.useEffect(()=>{
        if(isAuth){
            console.log('isAuth');
            history.push('/');
        }
    },[isAuth]);

    return (
        <div className={classes.container}>
            {loading && <LinearProgress color="secondary" />}
            <Container component="main" maxWidth="xs" >
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                </Typography>
                    <form className={classes.form} noValidate >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            color="secondary"
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
                            label="Password"
                            type="password"
                            color="secondary"
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
                            onClick={handleSignIn}
                        >
                            Sign In
                    </Button>
                        {/* {
                        loading?
                        <CircularProgress />
                        : null
                    } */}
                    </form>
                </div>
                <Box mt={4}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    );
}


const mapStateToProps = (state, ownProps) => {
    //console.log(state.auth);
    return {
        errorMessage: state.auth.errorMessage,
        loading: state.auth.loading,
        isAuth: state.auth.isAuth
    };
}



export default connect(mapStateToProps, {
    loginUser
})(SignIn);
