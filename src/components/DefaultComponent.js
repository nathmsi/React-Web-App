import React from 'react'


// material ui
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, 
    useTheme,

} from '@material-ui/core';

// windows dimention
import useWindowDimention from '../hooks/useWindowsDimention';


// redux
import { useSelector, useDispatch } from 'react-redux'
import {
   
} from '../store/actions';

// react-router
import { useLocation, useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    container: {
      
    },
}));


const DefaultComponent = (props) => {

    //style
    const theme = useTheme();
    const {
        width,
        height
    } = useWindowDimention();
    const classes = useStyles({ width, height });

    //react-router
    const history = useHistory();
    const loacation = useLocation();

    //redux
    const {
        
    }  = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //props
    const{

    } = props;


    // use one time at begining
    React.useEffect(()=>{

    },[]);




    return (
        <div className={classes.container}>
        </div>
    )
}



export default DefaultComponent;
