import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useLocation ,useHistory } from 'react-router-dom'

import { Typography } from '@material-ui/core';


// redux
import { useSelector , useDispatch } from 'react-redux'
import {
    getProductsHome,
    getMenu,
    getProductsByCategorie
} from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    select: {
        color: theme.palette.primary.main,
        "&:before": {
            borderColor: theme.palette.secondary.main
        },
        "&:after": {
            borderColor: theme.palette.secondary.main
        }
    },
    icon: {
        fill: theme.palette.secondary.main,
    },
}));

function ControlledOpenSelect(props) {
    const classes = useStyles();
    const theme = useTheme();
    let location = useLocation();
    let history = useHistory();

    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();
    const{
        categorieSelected,
        menu
    } = useSelector(state => state.product);

    React.useEffect(()=>{
        //console.log('getMenu()');
        dispatch(getMenu());
    },[]);

    const handleChange = (event) => {
        const myLoacation = location.pathname;
        //console.log(myLoacation);
        if(event.target.value === 'Home'){
            dispatch(getProductsHome());
        }else{
            dispatch(getProductsByCategorie(event.target.value));
        }
        if( myLoacation !== '/store/home'){
            history.push('/store/home');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormControl className={classes.formControl} >
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={categorieSelected}
                    onChange={handleChange}
                    className={classes.select}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        },
                    }}
                    color="secondary"
                >
                    {
                        menu.map(
                            el => <MenuItem  color="secondary" key={el} value={el}>
                                <Typography align="center"  color="secondary">{el}</Typography>
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </div>
    );
}



export default  ControlledOpenSelect;