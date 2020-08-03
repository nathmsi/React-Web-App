import React from 'react';
import Switch from '@material-ui/core/Switch';

import FormControlLabel from '@material-ui/core/FormControlLabel';

//redux
import { Context } from '../../contexts/themeContext';


export default function Switches(props) {
    const [state, setState] = React.useState(false);
    const themeColor = React.useContext(Context);

    const handleChange = (event) => {
        toogleDarkMode(!state);
        setState(event.target.checked);
    };

    const {
        toogleDarkMode,
        state: {
            theme
        }
    } = themeColor;

    React.useEffect(() => {
        // const lastTheme = localStorage.getItem('theme');
        if (theme.palette.type === 'dark') {
            setState(true);
        } else {
            setState(false);
        }
        // console.log(theme.palette.type);
    }, []);


    return (
        <div>
            <FormControlLabel
                value="end"
                control={
                    <Switch
                    checked={state}
                    onChange={handleChange}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label={props.darkMode}
                labelPlacement="end"
            />
        </div>
    );
}
