import React from "react";

import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, useTheme } from '@material-ui/core/styles';


import {
    NavLink
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: 0,
        paddingLeft: 24,
        paddingBottom: 5,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
}))

const NavLinkOption = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit" component={NavLink}   to="/">
                    <Badge badgeContent={0} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit" component={NavLink}   to="/products">
                    <Badge badgeContent={0} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </div>
            <div className={classes.sectionMobile}>
                <IconButton
                    aria-label="show more"
                    aria-controls={'mobileMenuId'}
                    aria-haspopup="true"
                    onClick={() => { }}
                    color="inherit"
                >
                    <MoreIcon />
                </IconButton>
            </div>
        </>
    )
}



export default NavLinkOption;



