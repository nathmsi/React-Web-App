import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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


import { Context as StoreContext } from '../../contexts/StoreContext';

import { useDispatch } from 'react-redux'

import {
    pushToShoppingCart
} from '../../store/actions';

import Home from '../../assets/menu/Home.jpg';
import Kippots from '../../assets/menu/Kippots.jpg';
import Clips from '../../assets/menu/Clips.jpg';
import Books from '../../assets/menu/Books.jpg';
import Hanouka from '../../assets/menu/Hanouka.jpg';
import Tefilins from '../../assets/menu/Tefilins.jpg';
import Pessah from '../../assets/menu/Pessah.png';
import Mezouzots from '../../assets/menu/Mezouzots.jpeg';
import Tallits from '../../assets/menu/Tallits.jpg';
import Klafims from '../../assets/menu/Klafims.jpg';
import Breslev from '../../assets/menu/Breslev.jpg';

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
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',

    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    img: {
        height: 70,
        width: 100,
    },
}));


export default function ImgMediaCard({ menu, handleSubmit }) {

    const classes = useStyles();
    const theme = useTheme();
    //console.log(menu);

    return (
        <>
            <Card className={classes.root} onClick={() => handleSubmit(menu)}>
                <CardActionArea className={classes.content}>
                    <CardContent>
                        <Typography variant="h5" align="center" >
                            {menu}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component={"img"}
                        alt="Contemplative Reptile"
                        className={classes.img}
                        image={GetImage(menu)}
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
            </Card>
        </>
    );
}


const GetImage = (menu) => {
    try {
        switch (menu) {
            case 'Home':
                return Home;
            case 'Kippots':
                return Kippots;
            case 'Clips':
                return Clips;
            case 'Pessah':
                return Pessah;
            case 'Mezouzots':
                return Mezouzots;
            case 'Klafims':
                return Klafims;
            case 'Hanouka':
                return Hanouka;
            case 'Oil':
                return Kippots;
            case 'Tallits':
                return Tallits;
            case 'Tefilins':
                return Tefilins;
            case 'Books':
                return Books;
            case 'Breslev':
                return Breslev;
            default:
                return Kippots;
        }
    }
    catch (err) {
        console.log(err);
        return Kippots;
    }
}

