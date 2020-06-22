import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import useWindowDimensions from '../../hooks/useWindowsDimention';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import AppBar from './appBar';

import DrawerContent from './DrawerContent';
import DrawerShoppingCart from './DrawerShoppingCart';

import NabBar from './NavBar';

import {
    NavLink
} from "react-router-dom";


//redux
import { connect } from 'react-redux';
import {
    loginOut
} from '../../store/actions';


import {
    NavLinkOption
} from '../Route';

import { Context as ContextNavigation } from '../../contexts/navigationContext';


const useStyles = makeStyles((theme) => ({
    content: {
        overflow: 'auto',
        height: props => ((props.height) - 48) / 2,
        border: 'solid',
        borderWidth: 1
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
}));


const HeaderComponent = (props) => {
    const { width, height } = useWindowDimensions();
    const classes = useStyles({
        width,
        height
    });
    const {
        state: { open },
        setOpen
    } = React.useContext(ContextNavigation);

    const signOut = () => {
        console.log('signOut');
        props.loginOut();
    }

    
    const toggleDrawer = (isOpen) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(isOpen)
    };



    return (
        <>
            <NabBar />
            <SwipeableDrawer
                anchor={'left'}
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <DrawerContent toggleDrawer={() => setOpen(false)} isAuth={props.isAuth} signOut={signOut}  />
            </SwipeableDrawer>
            <DrawerShoppingCart />
        </>
    )
}




const mapStateToProps = (state, ownProps) => {
    //console.log(state.auth);
    return {
        auth: state.auth,
    };
}



export default connect(mapStateToProps, {
    loginOut
})(HeaderComponent);
