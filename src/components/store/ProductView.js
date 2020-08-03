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

import SnackBar from '../SnackBar/SnackBar';
import Skeleton from '@material-ui/lab/Skeleton';


import { Context as ThemeContext } from '../../contexts/themeContext';

import { useDispatch } from 'react-redux'

import {
    pushToShoppingCart
} from '../../store/actions';

import Zoom from '@material-ui/core/Zoom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom direction="left" ref={ref} {...props} />;
});

import { withNamespaces } from 'react-i18next';


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
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    contentCard: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 0
    }
}));

function ProductDialog(props) {
    const dispatch = useDispatch();

    const [loadingMEdia, setLoadingMedia] = React.useState(true);

    const {
        width,
        height
    } = useWindowDimention();
    const classes = useStyles({ width });
    const {
        onClose,
        product,
        setSnack,
        open,
        productName
    } = props;

    const handleClose = () => {
        onClose();
    };

    const handleAddToShoppingCart = () => {
        dispatch(pushToShoppingCart(product));
        setSnack(true);
        handleClose();
    }

    const handleImageLoaded = () => {
        setLoadingMedia(false);
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            fullScreen={width < 600 ? false : false}
            TransitionComponent={Transition}
            onClose={handleClose}
            open={open}>
            {/* <DialogTitle id="simple-dialog-title" style={{ paddingBottom: 0, paddingTop: 0 }}>
                <div className={classes.titleView}>
                    <Typography align="center">
                    </Typography>
                    <div className={classes.grow} />
                    <IconButton
                        onClick={onClose}
                    >
                        <CloseIcon style={{ fontSize: '28px' }} />
                    </IconButton>
                </div>
            </DialogTitle> */}
            <DialogContent style={{ padding: 0 }}>
                <Card  >
                    <CardActionArea>
                        {loadingMEdia && <Skeleton animation="wave" variant="rect" width="100%" height={width> 500 ? height * (0.4) : height * (0.7)} />}
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            style={{ display: loadingMEdia ? 'none' : 'block' }}
                            height={width> 500 ? height * (0.6) : height * (0.7)}
                            width={width}
                            className={classes.img}
                            src={product.photo}
                            title={productName}
                            onLoad={handleImageLoaded}
                        />
                        <CardContent>
                            <div className={classes.contentCard}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {productName}
                                </Typography>
                                <Typography variant="h4" color="textSecondary" component="p">
                                    {product.price} ₪
                                </Typography>
                            </div>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {product.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.actions}>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>

                        <div>
                            {
                                width > 500 ?
                                    <Button
                                        onClick={() => handleAddToShoppingCart()}>
                                        <Typography variant="h6" style={{ textTransform: 'none' }}>
                                           +  {props.t('Shopping Cart')}
                                </Typography>
                                    </Button>
                                    : null
                            }
                            <IconButton
                                color="inherit"
                                onClick={() => handleAddToShoppingCart()}
                            >
                                <AddShoppingCartIcon style={{
                                    fontSize: '27px'
                                }} color="inherit" />
                            </IconButton>
                        </div>
                    </CardActions>
                </Card>
            </DialogContent>
        </Dialog>
    );
}

function ImgMediaCard({ product , t }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [loadingMEdia, setLoadingMedia] = React.useState(true);

    const [productName,setProductName] = React.useState();

    const{
        state: { language }
    } = React.useContext(ThemeContext);

    const handleImageLoaded = () => {
        setLoadingMedia(false);
    }


    React.useEffect(()=>{
        //console.log(language);
        switch (language) {
            case 'he':
                product.nameHE? setProductName(product.nameHE) : setProductName(product.name);
                break;
            case 'fr':
                product.nameFR? setProductName(product.nameFR) : setProductName(product.name);
                break;
            case 'en':
                product.nameEN? setProductName(product.nameEN) : setProductName(product.name);
                break;
            default: {
                setProductName(product.name);
            }
        }
    },[language]);


    //console.log(productName);


    return (
        <>
            <Card className={classes.root} onClick={() => setOpen(true)}>
                <CardActionArea>
                    {loadingMEdia && <Skeleton animation="wave" variant="rect" width="100%" height={180} />}
                    <CardMedia
                        component="img"
                        alt={productName}
                        height="180"
                        src={product.photo}
                        style={{ display: loadingMEdia ? 'none' : 'block' }}
                        className={classes.img}
                        title={productName}
                        onLoad={handleImageLoaded}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {loadingMEdia ? <Skeleton /> : productName.length > 18 ? productName.slice(0, 18) + '...' : productName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {loadingMEdia ? <Skeleton /> : product.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {loadingMEdia ? <Skeleton /> : `${product.price} ₪`}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {/* <CardActions>
               
            </CardActions> */}
            </Card>
            <ProductDialog product={product} t={t} productName={productName}  open={open} onClose={() => setOpen(false)} setSnack={(val) => setOpenSnack(val)} />
            <SnackBar open={openSnack}  success={true} duration={1000} positon={{ vertical: 'top', horizontal: 'center' }} handleClose={() => setOpenSnack(false)} message={`add to shopping cart`} />
        </>
    );
}


export default withNamespaces()(ImgMediaCard);