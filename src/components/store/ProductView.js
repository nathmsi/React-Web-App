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

import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { Context as StoreContext } from '../../contexts/StoreContext';

import { useDispatch } from 'react-redux'

import {
    pushToShoppingCart
} from '../../store/actions';


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
        objectFit: 'contain'
    },
    grow: {
        flexGrow: 1
    },
    titleView: {
        display: 'flex',
        alignItems: 'center'
    }
}));

function ProductDialog(props) {
    // const{
    //     pushToShoppingCart
    // } = React.useContext(StoreContext);
    const dispatch = useDispatch();

    const {
        width,
        height
    } = useWindowDimention();
    const classes = useStyles({ width });
    const {
        onClose,
        product,
        open
    } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            fullScreen={width < 600 ? true : false}
            TransitionComponent={Transition}
            onClose={handleClose}
            open={open}>
            <DialogTitle id="simple-dialog-title" style={{ paddingBottom: 0, paddingTop: 0 }}>
                <div className={classes.titleView}>
                    <Typography align="center">
                        {/* {product.name} */}
                    </Typography>
                    <div className={classes.grow} />
                    <IconButton
                        color="secondary"
                        onClick={onClose}
                    >
                        <CloseIcon style={{ fontSize: '28px'  }}  />
                    </IconButton>
                </div>

            </DialogTitle>
            <DialogContent style={{ padding: 0 }}>
                <Card  >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height={height * (1/2)}
                            width={width}
                            className={classes.img}
                            src={product.photo}
                            title={product.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {product.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Typography variant="h4" color="textSecondary" component="p">
                            {product.price} ₪
                        </Typography>
                        <div className={classes.grow} />
                        <Button
                        onClick={() => {
                            dispatch(pushToShoppingCart(product));
                            handleClose();
                        }}>
                            <Typography variant="h6" style={{ textTransform: 'none' }}>
                                Add to shopping cart
                        </Typography>
                        </Button>
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                dispatch(pushToShoppingCart(product));
                                handleClose();
                            }}
                        >
                            <AddShoppingCartIcon style={{
                                fontSize: '36px'
                            }} color="inherit" />
                        </IconButton>
                    </CardActions>
                </Card>
            </DialogContent>
        </Dialog>
    );
}

export default function ImgMediaCard({ product }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Card className={classes.root} onClick={() => setOpen(true)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="180"
                        src={product.photo}
                        className={classes.img}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.price} ₪
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {/* <CardActions>
               
            </CardActions> */}
            </Card>
            <ProductDialog product={product} open={open} onClose={() => setOpen(false)} />

        </>
    );
}
