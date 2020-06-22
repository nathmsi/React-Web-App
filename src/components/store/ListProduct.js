import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';

import ProductView from './ProductView';

import useWindowsDimention from '../../hooks/useWindowsDimention';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 48 + 20,
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    }
}));


export default function TitlebarGridList(props) {
    const classes = useStyles();

    const {
        width
    } = useWindowsDimention();

    const {
        products
    } = props;

    //console.log(width);


    return (
        <Container maxWidth="lg" className={classes.container}>
            <div className={classes.container}>
                <Grid
                    container
                    spacing={2}
                     >
                    {products.map(product => (
                        <Grid item xs={ width< 1200 ?  (width < 900 ? (width < 600 ? 12 : 6 ) : 4 ) : 3 } key={product.id} className={classes.item} >
                            <ProductView product={product} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
}

