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
import ListIcon from '@material-ui/icons/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LanguageIcon from '@material-ui/icons/Language';


import { withNamespaces } from 'react-i18next';


import InfoIcon from '@material-ui/icons/Info';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import {
    NavLink,
    useLocation,
    useHistory
} from "react-router-dom";
import { Typography } from '@material-ui/core';

import SelectLanguage from './SelectLanguage';


// redux
import { useSelector, useDispatch } from 'react-redux'
import {
    getProductsHome,
    getProductsByCategorie
} from '../../store/actions';
import useWindowDimensions from '../../hooks/useWindowsDimention';


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
        // color: theme.palette.secondary.main
    },
    navLinkActive: {
        //color: theme.palette.secondary.main,
        backgroundColor: theme.palette.action.hover
    },
    titleDrawer: {
        // color: theme.palette.secondary.main,
        fontSize: 28
    },
    titleStyle: {
        padding: 0
    },
    categoriesList: {
        margin: 5,
        maxHeight: props => props.height - 520 ,
        overflow: 'auto'
    }
}));


const ListElementHeader = (props) => {
    const { height } = useWindowDimensions();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles({ height });
    const dispatch = useDispatch();
    let { pathname } = useLocation();
    const {
        toggleDrawer,
        openCollspseMenu,
        setOpenCollspseMenu,
        signOut,
        isAuth
    } = props;

    const handleTitleClicked = () => {
        if (pathname !== '/') {
            history.push('/');
            toggleDrawer();
        }
    }

    const { menu, categorieSelected } = useSelector(state => state.product)

    const handleClickMenuProduct = () => {
        setOpenCollspseMenu(!openCollspseMenu);
    };

    const handleChangeCategorie = (categorie) => {
        const myLoacation = location.pathname;
        if (categorie === 'Home') {
            dispatch(getProductsHome());
        } else {
            dispatch(getProductsByCategorie(categorie));
        }
        if (myLoacation !== '/store/home') {
            history.push('/store/home');
        }
        toggleDrawer();
    };

    return (
        <div
            className={classes.list}
        >
            <div>
                <List className={classes.titleStyle}>
                    <ListItem className={classes.titleDrawer} >
                        <ListItemIcon >
                            <IconButton
                                color="inherit"
                                onClick={toggleDrawer}
                            >
                                <CloseIcon />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText>
                            <Button onClick={handleTitleClicked} style={{ textTransform: 'none' }}>
                                <Typography
                                    variant="h6"
                                    color="inherit"
                                    style={{
                                    }}
                                >
                                    {props.t('Saba Israel')}
                                </Typography>
                            </Button>
                        </ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem onClick={toggleDrawer} button component={NavLink} to="/" className={(pathname === '/') ? classes.navLinkActive : classes.navLink} >
                        <ListItemIcon> <HomeIcon color="inherit" /></ListItemIcon>
                        <ListItemText primary={props.t('Home')} />
                    </ListItem>
                    <ListItem onClick={toggleDrawer} button component={NavLink} to="/contact" className={(pathname === '/contact') ? classes.navLinkActive : classes.navLink} >
                        <ListItemIcon> <PermContactCalendarIcon color="inherit" /></ListItemIcon>
                        <ListItemText primary={props.t('Contact Me')} />
                    </ListItem>
                    <ListItem onClick={toggleDrawer} button component={NavLink} to="/about" className={(pathname === '/about') ? classes.navLinkActive : classes.navLink} >
                        <ListItemIcon> <InfoIcon color="inherit" /></ListItemIcon>
                        <ListItemText primary={props.t('About')} />
                    </ListItem>
                </List>

                <Divider />

                <List>
                    <ListItem onClick={handleClickMenuProduct} button className={(pathname === '/store/home') ? classes.navLinkActive : classes.navLink} >
                        {/* <ListItemIcon> <MenuIcon color="inherit" /></ListItemIcon> */}
                        <ListItemText primary={props.t('Categorie')} align="center" />
                        {openCollspseMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openCollspseMenu} timeout="auto" unmountOnExit>
                        <div className={classes.categoriesList} >
                            {/* <List component="div" disablePadding> */}
                                {
                                    (menu && menu.length > 1) ?
                                        <>
                                            {menu.map(
                                                categorie => (
                                                    <ListItem button key={categorie} className={classes.nested} onClick={() => handleChangeCategorie(categorie)} className={(categorie === categorieSelected) ? classes.navLinkActive : classes.navLink} >
                                                        <ListItemText primary={props.t(categorie)} align="center" />
                                                    </ListItem>
                                                )
                                            )}
                                        </>
                                        : null
                                }
                            {/* </List> */}
                        </div>
                    </Collapse>
                </List>
            </div>
            <div className={classes.footerfixed}>
                <Divider />
                <List>
                    <ListItem className={classes.navLink} >
                        <ListItemIcon> <LanguageIcon /></ListItemIcon>
                        <SelectLanguage />
                    </ListItem>
                    <ListItem className={classes.navLink} button >
                        <ListItemIcon> <PaletteIcon /></ListItemIcon>
                        <SwitchDarkMode darkMode={props.t('Dark Mode')} />
                    </ListItem>
                </List>
                <List>
                    {
                        isAuth ?
                            <ListItem button onClick={() => {
                                signOut();
                            }} className={classes.navLink} >
                                <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
                                <ListItemText primary={props.t('Sign Out')} />
                            </ListItem>
                            :
                            <ListItem onClick={toggleDrawer} button component={NavLink} to="/signIn" className={(pathname === '/signIn') ? classes.navLinkActive : classes.navLink} >
                                <ListItemIcon> <ExitToAppIcon color="inherit" /></ListItemIcon>
                                <ListItemText primary={props.t('Sign In')} />
                            </ListItem>
                    }
                </List>
            </div>


        </div>
    );
};




export default withNamespaces()(ListElementHeader);
