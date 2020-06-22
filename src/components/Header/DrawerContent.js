import React, { Component } from 'react'
import { connect } from 'react-redux'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import PaletteIcon from '@material-ui/icons/Palette';

import CloseIcon from '@material-ui/icons/Close';
import SelectColorTheme from './SelectColorTheme';
import SwitchDarkMode from './SwitchDarkMode';

import InfoIcon from '@material-ui/icons/Info';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import {
    NavLink,
    useLocation
} from "react-router-dom";
import { Typography } from '@material-ui/core';

import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    headerClose: {
        paddingBottom: 0,
        paddingTop: 0
    },
    iconButon: {
    },
    navLink: {
        color: theme.palette.secondary.main
    },
    navLinkActive: {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.action.hover
    },
    titleDrawer: {
        color: theme.palette.secondary.main,
        fontSize: 28
    },
    titleStyle: {
        padding: 0
    }
}));


const ListElementHeader = (props) => {
    let history = useHistory();
    const classes = useStyles();
    let { pathname } = useLocation();
    const {
        toggleDrawer,
        signOut,
        isAuth
    } = props;

    const handleTitleClicked = () => {
        if (pathname !== '/') {
            history.push('/');
            toggleDrawer();
        }
    }


    return (
        <div
            className={classes.list}
        >
            <div>
                <List className={classes.titleStyle}>
                    <ListItem className={classes.headerClose} className={classes.titleDrawer} >
                        <ListItemIcon >
                            <IconButton
                                color="secondary"
                                onClick={toggleDrawer}
                            >
                                <CloseIcon />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText>
                        <Button onClick={handleTitleClicked} style={{ textTransform: 'none' }}>
                            <Typography
                                variant="h6"
                                color="secondary"
                                style={{
                                }}
                            >
                                {'Saba Israel'}
                            </Typography>
                            </Button>
                        </ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem onClick={toggleDrawer} component={NavLink} to="/store/home" className={(pathname === '/store/home' || pathname === '') ? classes.navLinkActive : classes.navLink} >
                        <ListItemIcon> <HomeIcon color="inherit" /></ListItemIcon>
                        <ListItemText primary={'Home Product'} />
                    </ListItem>
                    <ListItem onClick={toggleDrawer} component={NavLink} to="/contact" className={(pathname === '/contact') ? classes.navLinkActive : classes.navLink} >
                        <ListItemIcon> <PermContactCalendarIcon color="inherit" /></ListItemIcon>
                        <ListItemText primary={'Contact Me'} />
                    </ListItem>
                    <ListItem onClick={toggleDrawer} component={NavLink} to="/about" className={(pathname === '/about') ? classes.navLinkActive : classes.navLink} >
                        <ListItemIcon> <InfoIcon color="inherit" /></ListItemIcon>
                        <ListItemText primary={'About'} />
                    </ListItem>
                </List>
                <Divider />
            </div>
            <div className={classes.footerfixed}>
                <Divider />
                <List>
                    {/* <ListItem className={classes.navLink} >
                    <ListItemIcon> <PaletteIcon /></ListItemIcon>
                    <SelectColorTheme />
                </ListItem> */}
                    <ListItem className={classes.navLink} >
                        <ListItemIcon> <PaletteIcon /></ListItemIcon>
                        <SwitchDarkMode />
                    </ListItem>
                </List>
                <List>
                    {
                        isAuth ?
                            <ListItem button onClick={()=>{
                                signOut();
                            }} className={classes.navLink} >
                                <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
                                <ListItemText primary={'Log out'} />
                            </ListItem>
                            :
                            <ListItem onClick={toggleDrawer} component={NavLink} to="/signIn" className={(pathname === '/signIn') ? classes.navLinkActive : classes.navLink} >
                                <ListItemIcon> <InfoIcon color="inherit" /></ListItemIcon>
                                <ListItemText primary={'Sign In'} />
                            </ListItem>
                    }
                </List>
            </div>


        </div>
    );
};




export default ListElementHeader;
