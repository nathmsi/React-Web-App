import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';

import useWindowDimention from '../../hooks/useWindowsDimention';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { Context as StoreContext } from '../../contexts/StoreContext';
import { withNamespaces } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux'

import {
    pushToShoppingCart
} from '../../store/actions';

import useOrder from '../../hooks/useOrder';
import OrderForm from '../Form/OrderForm';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        //width: 300,
        flexGrow: 1,
        margin: 0
    },
    rootDialog: {
        // width: props => props.width * (9 / 10),
    },
    img: {
    },
    grow: {
        flexGrow: 1
    },
    titleView: {
        display: 'flex',
        alignItems: 'center'
    }
}));

function OrderDialogue(props) {


    const {
        createNewOrder,
        loading,
        errorMessage,
        success
    } = useOrder();


    const {
        width,
        height
    } = useWindowDimention();
    const classes = useStyles({ width });
    const {
        onClose,
        shoppingCart,
        total,
        open
    } = props;

    const {
        user
    } = useSelector(state => state.auth);

    const handleClose = () => {
        onClose();
    };
    //console.log(shoppingCart);

    const createOrder = (order) => {
        const products = shoppingCart.map(e => ({ id: e.id, count: e.count }));
        const obj = {
            ...order,
            count: total.totalCount,
            total: total.totalPrice,
            products
        }
        createNewOrder(obj);
        console.log(obj);
    }

    React.useEffect(() => {
        if (success) {
            handleClose();

        }
    }, [success]);


    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            fullScreen={width < 600 ? true : false}
            TransitionComponent={Transition}
            onClose={handleClose}
            open={open}>
            <DialogTitle id="simple-dialog-title" style={{ paddingBottom: 0, paddingTop: 0 }}>
                <List dense={true}>
                    <ListItem   >
                        <ListItemText
                            primary={ props.t("count") + ' ' + total.totalCount}
                            secondary={ props.t("Total") + ' ' + total.totalPrice + ' ₪'}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                color="inherit"
                                onClick={onClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </DialogTitle>
            <DialogContent style={{ padding: 0 }}>
                {
                    user &&
                    <OrderForm t={props.t} createNewOrder={createOrder} positon={{ vertical: 'bottom', horizontal: 'right' }} name={user.displayName} email={user.email} loading={loading} errorMessage={errorMessage} success={success} total={total.totalPrice} />
                }
            </DialogContent>
        </Dialog>
    );
}

export default withNamespaces()(OrderDialogue);
