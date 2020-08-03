import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useLocation, useHistory } from 'react-router-dom'

import {
    Typography
} from '@material-ui/core';

import {
    Context as ThemeContext
} from '../../contexts/themeContext';



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
            borderColor: theme.palette.primary.main
        },
        "&:after": {
            borderColor: theme.palette.primary.main
        }
    },
    icon: {
        fill: theme.palette.primary.main,
    },
}));

function ControlledOpenSelect(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const {
        state: {
            language,
            menuLanguages
        },
        setLanguage
    } = React.useContext(ThemeContext);


    React.useEffect(() => {
    }, []);

    const handleChange = (event) => {
        //console.log(event.target.value);
        setLanguage(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const getLanguage = (val) => {
        switch (val) {
            case 'en':
                return 'en - English';
            case 'fr':
                return 'fr - Francais';
            case 'he':
                return 'he - עברית';
            default:
              return 'en - English';
        }
    }


    return (
        <div >
            {
                (menuLanguages && menuLanguages.length > 1) ?
                    <FormControl className={classes.formControl} >
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={language}
                            onChange={handleChange}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                            color="primary"
                        >
                            {
                                menuLanguages.map(
                                    el => <MenuItem key={el} value={el}>
                                        <Typography align="center" color="inherit" >
                                            {getLanguage(el)}
                                        </Typography>
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    : null
            }
        </div>
    );
}



export default ControlledOpenSelect;