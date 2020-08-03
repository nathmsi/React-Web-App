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

import PersonIcon from '@material-ui/icons/Person';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import {
    TextField, useTheme, InputAdornment
} from '@material-ui/core';

import { Context as ContextNavigation } from '../../contexts/navigationContext';

import SelectCategorie from '../store/SelectCategorie';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    NavLink
} from "react-router-dom";
import { Context as StoreContext } from '../../contexts/StoreContext';
import useWindowDimensions from "../../hooks/useWindowsDimention";

import { useLocation, useHistory } from 'react-router-dom'

import { withNamespaces } from 'react-i18next';


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
    },
    input: {
        backgroundColor: theme.palette.background.default,
        width: 140,
    },
    inputStyle: {
        display: props => props.width < 600 ? 'none' : 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'nowrap',
        borderRadius: 8,
        backgroundColor: theme.palette.background.default,
        paddingLeft: theme.spacing(2),
    },
    iconButton: {
        marginLeft: 5,
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
        color: theme.palette.secondary.main,
    },
    search: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'center',
        // border: 'solid 1px  red',
        // flexWrap: 'nowrap',
    }
}));

function NavBar(props) {
    const theme = useTheme();
    const {
        width
    } = useWindowDimensions();
    const classes = useStyles({ width });

    const [openSearch, setOpenSearch] = React.useState(true);
    const {
        state: { },
        setOpen,
        setOpenSH,
        setOpenUser
    } = React.useContext(ContextNavigation);

    const {
        shoppingCart
    } = useSelector(state => state.shoppingCart);
    const {
        isAuth
    } = useSelector(state => state.auth);

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
                color="secondary"
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
                    
                    <Button onClick={handleTitleClicked} style={{ textTransform: 'none' }} color="inherit"  >
                        <Typography className={classes.title} align="center" color="inherit" >
                            {props.t("Saba Israel")}
                        </Typography>
                    </Button>

                    <SelectCategorie hide={(width < 690)} />


                    <div className={classes.grow} />


                    <div className={classes.inputStyle}  >
                        <InputBase
                            className={classes.input}
                            placeholder={props.t("Search Products")}
                        />
                        <IconButton type="submit" className={classes.iconButton} onClick={() => setOpenSearch(!openSearch)}>
                            <SearchIcon />
                        </IconButton>
                    </div>



                    {isAuth ?
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setOpenUser(true)}
                            className={classes.iconButton}
                        >
                            <PersonIcon color="inherit" />
                        </IconButton> : null
                    }


                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpenSH(true)}
                        className={classes.iconButton}
                    >
                        <Badge
                            badgeContent={
                                <Typography>
                                    {shoppingCart.length}
                                </Typography>
                            } color="secondary"  >
                            <ShoppingCartIcon color="inherit" />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}


export default withNamespaces()(NavBar);