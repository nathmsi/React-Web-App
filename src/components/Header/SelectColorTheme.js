import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Context } from '../../contexts/themeContext';

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
        fill: theme.palette.primary.main
    },
}));

function ControlledOpenSelect(props) {

    const classes = useStyles();
    const themeColor = React.useContext(Context);
    const [open, setOpen] = React.useState(false);
    const [theme, setTheme] = React.useState('');

    const {
        state,
        setColorBlue,
        setColorNoir
    } = themeColor;


    //console.log(theme);

    React.useEffect(() => {
        const lastTheme = localStorage.getItem('theme');
        setTheme(lastTheme);
    }, [])


    const handleChange = (event) => {
        setTheme(event.target.value);
        switch (event.target.value) {
            case 'ColorNoir': {
                setColorNoir();
                break;
            }
            case 'ColorBlue': {
                setColorBlue();
                break;
            }
            default: {
                setColorBlue();
                break;
            }
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
                    value={theme}
                    onChange={handleChange}
                    className={classes.select}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        },
                    }}
                >
                    <MenuItem key={'ColorNoir'} style={{ color: '#000'}} value={'ColorNoir'}>{'ColorNoir'}</MenuItem>
                    <MenuItem key={'ColorBlue'} style={{ color: '#115293'}} value={'ColorBlue'}>{'ColorBlue'}</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}




export default ControlledOpenSelect;