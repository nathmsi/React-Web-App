import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import useWindowsDimention from '../../hooks/useWindowsDimention';

import { IconButton, Typography } from '@material-ui/core';

import { Context as ContextDrawer } from '../../contexts/navigationContext';
import { Context as StoreContext } from '../../contexts/StoreContext';

import OrderDialog from '../store/OrderDialog';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {
    deleteAllShoppingCart,
    deleteOneShoppingCart,
    updateCountShoppingCart
} from '../../store/actions';

import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    list: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    listContent: {
        height: props => props.height - 156,
        display: 'flex',
        justifyContent: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerClose: {
        paddingBottom: 0,
        paddingTop: 0,
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
        padding: 0,
        width: props => props.width < 600 ? props.width : props.width * (1 / 2)
    },
    listProduct: {
        height: props => props.height - 156,
        overflow: 'auto',
    }
}));

export default function TemporaryDrawer() {
    const {
        width, height
    } = useWindowsDimention();
    const classes = useStyles({ width, height });
    const [open, setOpen] = React.useState(false);


    const [total, setTotal] = React.useState({
        totalCount: 0,
        totalPrice: 0
    })

    let history = useHistory();
    const dispatch = useDispatch();
    const {
        shoppingCart
    } = useSelector(state => state.shoppingCart);
    //console.log(shoppingCart);

    const {
        setOpenSH,
        state: {
            openSH
        }
    } = React.useContext(ContextDrawer);




    const toggleDrawer = () => {
        setOpenSH(!openSH);
    }
    const {
        isAuth
    } = useSelector(state => state.auth);
    const openOrder = () => {
        if (isAuth) {
            setOpen(true);
        } else {
            console.log('not connected');
            toggleDrawer();
            history.push('/signIn');
        }
    }



    //console.log(shoppingCart);

    React.useEffect(() => {
        if (shoppingCart.length > 0) {
            let totalCount = 0;
            shoppingCart.forEach(el => totalCount += el.count);
            const totalPrice = shoppingCart.map((el) => (el.price * el.count)).reduce((acc, element) => acc + element);
            //console.log('totalPrice', totalPrice);
            setTotal({
                totalPrice, totalCount
            })
        }
    }, [shoppingCart]);



    return (
        <Drawer anchor={'right'} open={openSH} onClose={toggleDrawer}   style={{  opacity: 0.95  }} >
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
                                {'Shopping Cart'}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
                <Divider />
            </div>
            <div >
                <div >
                    {
                        shoppingCart.length > 0 ?
                            < List className={classes.listProduct}>
                                {shoppingCart.map(
                                    product => (
                                        <ListItem key={product.id} >
                                            <ListItemAvatar>
                                                <Avatar src={product.photo} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={width < 450 ? (product.name.length < 15 ? product.name : product.name.slice(0, 15) + '...') : product.name}
                                                secondary={(product.price * product.count) + ' ₪'}
                                            />
                                            <ListItemSecondaryAction>
                                                <TextField
                                                    type="number"
                                                    value={product.count}
                                                    onChange={(event) => dispatch(updateCountShoppingCart(product.id, parseInt(event.target.value)))}
                                                    InputProps={{
                                                        inputProps: {
                                                            max: 99, min: 1,
                                                        }
                                                    }}>
                                                </TextField>
                                                <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteOneShoppingCart(product.id))}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                )
                                }
                            </List>
                            :
                                <div className={classes.listContent}>
                                    <Typography align="center" variant="h5" >
                                        Not Product Found !
                                </Typography>
                                </div>
                    }

                </div>
                <div>
                    <Divider />
                    <List dense={false}>
                        <ListItem   >
                            <ListItemText
                                primary={'count ' + total.totalCount}
                                secondary={total.totalPrice + ' ₪'}
                            />
                            <ListItemSecondaryAction>
                                <Button onClick={() => openOrder()}>
                                    <Typography >
                                        Check Order
                                    </Typography>
                                </Button>
                                <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteAllShoppingCart())}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </div>
            </div>
            <OrderDialog shoppingCart={shoppingCart} total={total} open={open} onClose={() => setOpen(false)} />
        </Drawer >
    );
}
