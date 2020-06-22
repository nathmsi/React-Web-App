import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import {
    Typography,
    Card,
    CardMedia,
    Grid,
    Container
} from '@material-ui/core';

import useWindowDimention from '../hooks/useWindowsDimention';

import Magazin1 from '../assets/magazin2.jpg';

import MenuView from '../components/store/MenuView';


// redux
import { useSelector , useDispatch } from 'react-redux'
import {
    getProductsByCategorie,
    getProductsHome
} from '../store/actions';


import { useLocation ,useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: 0,
        backgroundColor: theme.palette.background.default
    },
    media: {
        height: props => props.height,
    },
    card: {
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        width: props => props.width,
        height: props => props.height,
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
        fontSize: '65px',
        fontWeight: 600
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    container: {
        marginTop: 20
    }
}));


const HomeScreen = (props) => {
    const {
        width,
        height
    } = useWindowDimention();
    const contentHeight = (height) / 2
    const classes = useStyles({ width, height: contentHeight });
    let history = useHistory();
    const{
        menu
    } = useSelector(state => state.product);
    const dispatch = useDispatch();



    const handleSubmit = (menuSelected) =>{
        if(menuSelected === 'Home'){
            dispatch(getProductsHome());
        }else{
            dispatch(getProductsByCategorie(menuSelected));
        }
        history.push('/store/home');
    }



    return (
        <div className={classes.content}>
            <Card className={classes.card}>
                <CardMedia image={Magazin1} className={classes.media} />
                <div className={classes.overlay}>
                    <Typography color="primary" className={classes.title}>
                        Saba Israel
                    </Typography>
                    <Typography color="primary" >

                    </Typography>
                </div>
            </Card>
            <Container maxWidth="lg" className={classes.container}>
                <Grid
                    container
                    spacing={2}
                >
                    {menu.slice(1).map(elem => (
                    <Grid item xs={width < 1200 ? (width < 900 ? (width < 600 ? 12 : 6) : 4) : 3} key={elem} className={classes.item}>
                        <MenuView  menu={elem} handleSubmit={(val) => handleSubmit(val)} />
                    </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}



export default HomeScreen;
