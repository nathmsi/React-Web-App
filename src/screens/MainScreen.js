import React, { useEffect } from 'react';

import { makeStyles, } from '@material-ui/core/styles';


import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';

//login screen
import LoginUserScreen from './LoginUserScreen'

//home screen


import Header from '../components/Header'


import Grid from '@material-ui/core/Grid';

import useWindowDimensions from '../hooks/useWindowsDimention';

import {
    MainRoute
} from '../components/Route'

//redux
import { connect } from 'react-redux';
import {
    tryLocalSignin
} from '../store/actions';

import { Provider as ProviderNavigation } from '../contexts/navigationContext';

// Context Theme
import { Context as ThemeContext } from '../contexts/themeContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.secondary.main,
            outline: '1px solid slategrey'
        },
        'MuiToolbar-gutters': {
            padding: 0,
            margin: 0
        },
        '.MuiCardMedia-media': {
            //objectFit: 'contain'
        }
    },
    root: {
        background: theme.palette.background.default
    },
    hide: {
        display: 'none',
    },
    circularProgress: {
        marginTop: 100
    },
    linearProgress: {
        position: 'absolute',
        top: 53,
        width: '100%',
        left: 0
    },
}));


const MiniDrawer = (props) => {

    const theme = React.useContext(ThemeContext);


    const {
        isAuth,
        loading
    } = props.auth;

    //console.log(theme.state);


    useEffect(
        () => {
            props.tryLocalSignin();
            const dark = localStorage.getItem('dark');
            console.log(`dark = ${dark}`);
            if (dark === 'not-dark') {
                theme.toogleDarkMode(false);
            }
        }, [])


    return (
        <MuiThemeProvider theme={createMuiTheme(theme.state.theme)}>
            <ProviderNavigation>
                <Main isAuth={isAuth} loading={loading} loadingMenu={props.loadingMenu}/>
            </ProviderNavigation>
        </MuiThemeProvider>
    );
}


const Main = ({
    isAuth,
    loading,
    loadingMenu
}) => {
    const classes = useStyles();
    //console.log(loading);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header isAuth={isAuth} />
            {( loading || loadingMenu)  && <div className={classes.linearProgress} ><LinearProgress color="primary" /> </div>}
            <MainRoute />

        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    //console.log(state.search);
    return {
        auth: state.auth,
        isAuth: state.auth.isAuth,
        loadingMenu: state.product.loadingMenu
    };
}



export default connect(mapStateToProps, {
    tryLocalSignin
})(MiniDrawer);
