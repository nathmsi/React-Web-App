import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';


import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { Context as ContextNavigation } from '../../contexts/navigationContext';

import SelectCategorie from '../store/SelectCategorie';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    NavLink
} from "react-router-dom";
import { Context as StoreContext } from '../../contexts/StoreContext';
import useWindowDimensions from "../../hooks/useWindowsDimention";

import { useLocation, useHistory } from 'react-router-dom'



// redux
import { useSelector } from 'react-redux'
import { Button } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        //display: "none",
        // [theme.breakpoints.up("sm")]: {
        //     display: "block"
        // },
        marginRight: theme.spacing(2)
    },
    input: {
        padding: '1px 2px',
        marginLeft: theme.spacing(1),
        width: 160,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
        color: theme.palette.secondary.main,
    },
}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const {
        width
    } = useWindowDimensions();
    const [openSearch, setOpenSearch] = React.useState(false);
    const {
        state: { },
        setOpen,
        setOpenSH
    } = React.useContext(ContextNavigation);

    const {
        shoppingCart
    } = useSelector(state => state.shoppingCart);

    const history = useHistory();
    const location = useLocation();
    const handleTitleClicked = () => {
        if (location.pathname !== '/') {
            history.push('/');
        }
    }

    return (
        <div className={classes.grow}>
            <AppBar
                position="fixed"
                color="inherit"
                style={{
                    opacity: 0.8
                }}
            >
                <Toolbar variant="dense" color="secondary">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    {(width > 500) ?
                        <Button onClick={handleTitleClicked} style={{ textTransform: 'none' }}>
                            <Typography className={classes.title} variant="h6" noWrap>
                                Saba Israel
                    </Typography>
                        </Button>
                        : null}
                    {(!openSearch || width > 500) ? <SelectCategorie /> : null}
                    <div className={classes.grow} />
                    <Grow direction="left" in={openSearch} timeout={600}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Products"
                            color="secondary"
                            autoFocus={true}
                            onBlur={() => setOpenSearch(!openSearch)}
                        />
                    </Grow>
                    <IconButton color="primary" type="submit" className={classes.iconButton} aria-label="search" onClick={() => setOpenSearch(!openSearch)}>
                        <SearchIcon color="secondary" />
                    </IconButton>
                    {/* <Divider className={classes.divider} orientation="vertical" /> */}

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpenSH(true)}
                        className={classes.iconButton}
                    >
                        <Badge badgeContent={shoppingCart.length} color="secondary" >
                            <ShoppingCartIcon color="inherit" />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

