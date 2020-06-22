import createDataContext from './createDataContext'
 


const stockReducer = (state, action) => {
    switch (action.type) {
        case 'set_color':
            const theme = state.theme;
            theme.palette.primary.main = action.payload;
            return { ...state, theme: { ...theme } }
        case 'toogle_dark_mode':
            return { ...state, theme: action.payload !== 'dark' ? { ...themeNotDark } : { ...themeDark } }
        default: return state;
    }
}

const toogleDarkMode = (dispatch) => {
    return (dark) => {
        //console.log(dark)
        localStorage.setItem('dark', dark ? 'dark' : 'not-dark');
        dispatch({
            type: 'toogle_dark_mode',
            payload: dark ? 'dark' : 'not-dark'
        })
    }
}


const setColorNoir = (dispatch) => {
    return () => {
        DispatchTeme(dispatch, 'ColorNoir');
    };
};

const setColorBlue = (dispatch) => {
    return () => {
        DispatchTeme(dispatch, 'ColorBlue');
    };
};



const setTheme = (dispatch) => {
    return (theme) => {
        DispatchTeme(dispatch, theme);
    };
};

const DispatchTeme = (dispatch, theme) => {
    localStorage.setItem('theme', theme);
    switch (theme) {
        case 'ColorNoir': {
            dispatch({ type: 'set_color', payload: '#000' });
            break;
        }
        case 'ColorBlue': {
            dispatch({ type: 'set_color', payload: '#fafafa' });
            break;
        }
        default: {
            dispatch({ type: 'set_color', payload: { theme: '#fafafa' } });
            break;
        }
    }
}

const themeDark = {
    palette: {
        primary: {
            main: '#fafafa',
            default: '#fafafa',
        },
        text: {
            primary: '#fafafa',
            secondary: '#fafafa'
        },
        secondary: {
            main: '#fafafa',
        },
        background: {
        },
        type: "dark"
    }
}

const themeNotDark = {
    palette: {
        primary: {
            main: '#fafafa',
            default: '#407294',
        },
        secondary: {
            main: '#407294',
        },
        text: {
            primary: '#407294',
            secondary: '#407294'
        },
        background: {
            main: '#407294'
        },
        type: "light"
    }
}





export const { Context, Provider } = createDataContext(
    stockReducer,
    {
        setColorBlue,
        setColorNoir,
        setTheme,
        toogleDarkMode
    },
    {
        theme: themeDark
    }
);