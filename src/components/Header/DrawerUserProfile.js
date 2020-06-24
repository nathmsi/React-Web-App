import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import useWindowsDimention from '../../hooks/useWindowsDimention';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

import { IconButton, Typography } from '@material-ui/core';

import { Context as ContextDrawer } from '../../contexts/navigationContext';

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

import yelp from '../../api/yelp';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {
    deleteAllShoppingCart,
    deleteOneShoppingCart,
    updateCountShoppingCart
} from '../../store/actions';

import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    list: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    listContent: {
        marginTop: theme.spacing(7),
        height: props => props.height - 90,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerClose: {
        paddingBottom: 0,
        paddingTop: 0,
    },
    titleDrawer: {
        color: theme.palette.secondary.main,
        fontSize: 28
    },
    titleStyle: {
        padding: 0,
        width: props => props.width < 600 ? props.width : props.width * (1 / 2)
    },
    listProduct: {
        height: props => props.height - 156,
        overflow: 'auto',
    }
}));

const SmallIcon = withStyles((theme) => ({
    root: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        cursor: 'pointer'
    },
}))(EditIcon);

export default function TemporaryDrawer() {
    //const [result, setResult] = React.useState(null);
    const [backdrop, setBackdrop] = React.useState(false);


    const {
        width, height
    } = useWindowsDimention();
    const classes = useStyles({ width, height });


    const dispatch = useDispatch();
    const {
        user
    } = useSelector(state => state.auth);
    //console.log(shoppingCart);

    const {
        setOpenUser,
        state: {
            openUser
        }
    } = React.useContext(ContextDrawer);




    const toggleDrawer = () => {
        setOpenUser(!openUser);
    }






    React.useEffect(() => {
    }, []);

    const uploadImage = (uploadedFile) => {
        try {
            const upload = firebase.storage().ref('images/profile/' + user.uid);
            upload.put(uploadedFile).then(
                (snapshot) => {
                    upload.getDownloadURL().then((url) => {
                        console.log(url);
                        firebase.auth().currentUser.updateProfile({
                            photoURL: url
                        }).then(
                            async () => {
                                // const path = `users/${user.uid}`;
                                // const obj = {
                                //     displayName: user.displayName,
                                //     email: user.email,
                                //     uid: user.uid,
                                //     photoUrl: url
                                // }
                                // const response = await yelp.put(path, obj);
                                // console.log(response.data);
                                console.log("%c savePhotoToUser  ", "color:yellow", url);
                                setBackdrop(false);
                            },
                            (error) => {
                                console.log(url);
                                setBackdrop(false);
                            }
                        )

                    })
                }
            )
        } catch (err) {
            console.log(err);
            setBackdrop(false);
        }
    }

    const loadImageToProduct = (uploadedFile) => {
        if (uploadedFile) {
            try {
                setBackdrop(true);
                if (user.photoURL) {
                    const storageRef = firebase.storage().refFromURL(user.photoURL);
                    storageRef.delete().then(() => {
                        uploadImage(uploadedFile);
                    })
                } else {
                    uploadImage(uploadedFile);
                }
            }
            catch (err) {
                console.log(err);
                setBackdrop(false);
            }
        }
    }
    const addFile = async (event) => {
        try {
            var uploadedFile = event.target.files[0];
            if (uploadedFile) {
                loadImageToProduct(uploadedFile);
            }
        }
        catch (error) {
            console.log(error);
        }
    };







    // if (user) {
    //     console.log(user.displayName,
    //         user.email,
    //         user.photoURL);
    // }


    return (
        <Drawer anchor={'right'} open={openUser} onClose={toggleDrawer} style={{ opacity: 0.95 }} >
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
                            <Typography
                                variant="h6"
                                color="secondary"
                                style={{
                                }}
                            >
                                {'User Profile'}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
                <Divider />
            </div>
            {
                user ?
                    <div className={classes.listContent}>
                        <Badge
                            style={{
                                marginBottom: 20
                            }}
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                <Tooltip title="Edit Image" placement="right">
                                    <Button
                                        component="label"
                                    >
                                        <SmallIcon alt="Remy Sharp" />
                                        <input
                                            onChange={addFile}
                                            accept='.jpg'
                                            type="file"
                                            style={{ display: "none" }}
                                        />
                                    </Button>
                                </Tooltip>}
                        >
                            <Avatar className={classes.avatar} alt={user.displayName ? user.displayName : ''} src={user.photoURL ? user.photoURL : ''} />
                        </Badge>
                        <Typography align="center" variant="h5" >
                            {user.displayName ? user.displayName : ''}
                        </Typography>
                        <Typography align="center" variant="h5" >
                            {user.email ? user.email : ''}
                        </Typography>
                        {
                            backdrop ?
                                <CircularProgress color="primary" style={{ margin: 10 }} />
                                : null
                        }
                    </div>
                    : null
            }


        </Drawer >
    );
}
