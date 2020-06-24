import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import { Context as StoreContext } from '../../contexts/StoreContext';
import { Typography, LinearProgress } from '@material-ui/core';

import ListProduct from './ListProduct';

// redux
import { useSelector , useDispatch } from 'react-redux'
import {
    getProductsHome
} from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    content: {
    },
    mainContent: {
        marginTop: 53,
        backgroundColor: theme.palette.background.default
    },
    progress:{
        position: 'absolute',
        top:53,
        width: '100%',
        left:0
    }
}));


const HomeProducts = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const {
        products,
        loading,
        errorMessage 
    } = useSelector(state => state.product);



    React.useEffect(() => {
        if(products.length === 0 && !loading){
            dispatch(getProductsHome());
        }
    }, []);


    return (
        <div className={classes.content}>
            <div className={classes.mainContent}>
                {loading && <div className={classes.progress}> <LinearProgress color="secondary" /> </div>}
                {errorMessage && <Typography color="error" align="center"  style={{ marginTop: 55}}>{errorMessage}</Typography>}
                <ListProduct products={products} />
            </div>

        </div>
    )
}



export default HomeProducts;
