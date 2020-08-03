import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    CardMedia,
    LinearProgress
} from '@material-ui/core';

import ListProduct from '../components/store/ListProduct';
import Magazin1 from '../assets/magazin2.jpg';

import { withNamespaces } from 'react-i18next';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {
    getProductsHome
} from '../store/actions';
import useWindowDimensions from '../hooks/useWindowsDimention';

const useStyles = makeStyles((theme) => ({
    content: {
    },
    media: {
        height: '30vh',
        position: 'sticky',
        top: 0,
    },
    overlay: {
        position: 'fixed',
        width: props => props.width - 20,
        marginLeft: 10,
        marginRight: 10,
        height: '30vh',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        top: 0,
        left: 0,
    },
    title: {
        color: '#FFF',
        fontSize: '65px',
        fontWeight: 600
    },
    mainContent: {
        backgroundColor: theme.palette.background.default,
    },
    progress: {
        position: 'absolute',
        top: 53,
        width: '100%',
        left: 0
    }
}));


const HomeProducts = (props) => {
    const { width } = useWindowDimensions();
    const classes = useStyles({ width });

    const dispatch = useDispatch();

    const {
        products,
        loading,
        errorMessage,
        categorieSelected
    } = useSelector(state => state.product);



    React.useEffect(() => {
        if (products.length === 0 && !loading) {
            dispatch(getProductsHome());
        }
    }, []);


    return (
        <div className={classes.content}>
            <CardMedia image={Magazin1} className={classes.media} />
            {loading && <div className={classes.progress}> <LinearProgress /> </div>}
            <div className={classes.overlay}>
                <Typography color="primary" className={classes.title}>
                    {props.t(categorieSelected)}
                </Typography>
            </div>

            <div className={classes.mainContent}>
                <ListProduct products={products} />
                {errorMessage && <Typography color="error" align="center" style={{ marginTop: 5 }}>{errorMessage}</Typography>}
            </div>



        </div>
    )
}



export default withNamespaces()(HomeProducts);
