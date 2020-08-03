import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useLocation, useHistory } from 'react-router-dom'

import { Typography } from '@material-ui/core';
import { withNamespaces } from 'react-i18next';


// redux
import { useSelector, useDispatch } from 'react-redux'
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
        color: theme.palette.background.main, // theme.palette.primary.main,
        "&:before": {
            borderColor: theme.palette.background.main
        },
        "&:after": {
            borderColor: theme.palette.background.main
        }
    },
    icon: {
        fill: theme.palette.background.main,
    },
}));

function ControlledOpenSelect(props) {
    const classes = useStyles();
    const theme = useTheme();
    let location = useLocation();
    let history = useHistory();

    const [open, setOpen] = React.useState(false);


    const dispatch = useDispatch();
    const {
        categorieSelected,
        menu
    } = useSelector(state => state.product);

    React.useEffect(() => {
        //console.log('getMenu()');
        console.log('getMenu');
        dispatch(getMenu());
    }, []);

    const handleChange = (event) => {
        const myLoacation = location.pathname;
        //console.log(myLoacation);
        if (event.target.value === 'Home') {
            dispatch(getProductsHome());
        } else {
            dispatch(getProductsByCategorie(event.target.value));
        }
        if (myLoacation !== '/store/home') {
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
        <div style={{  height: '53px' }}>
            <div style={{ display: props.hide ? 'none' : 'block'}}>
                {
                    (menu && menu.length > 1) ?
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
                                        el => <MenuItem key={el} value={el} align="center">
                                            <Typography align="center" color="inherit" >{props.t(el)}</Typography>
                                        </MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                        : null
                }
            </div>
        </div>
    );
}



export default withNamespaces()(ControlledOpenSelect);