import createDataContext from './createDataContext'
 


const Reducer = (state, action) => {
    switch (action.type) {
        case 'set_color':
            const theme = state.theme;
            theme.palette.primary.main = action.payload;
            return { ...state, theme: { ...theme } }
        case 'toogle_dark_mode':
            return { ...state, theme: action.payload !== 'dark' ? { ...themeNotDark } : { ...themeDark } }
        case 'set_language':
            return { ...state, language: action.payload }
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
            main: '#424242',
        },
        background: {
            main: '#fff'
        },
        type: "dark"
    }
}

const themeNotDark = {
    palette: {
        primary: {
            main: '#0E2F44',
            default: '#0E2F44',
        },
        secondary: {
            main: '#0E2F44',
        },
        text: {
            primary: '#0E2F44',
            secondary: '#0E2F44'
        },
        background: {
            main: '#fff'
        },
        type: "light"
    }
}

const setLanguage = (dispatch) => {
    return (language) => {
        localStorage.setItem('language', language);
        dispatch({ 
            type: 'set_language',
            payload: language
        })
    }
}





export const { Context, Provider } = createDataContext(
    Reducer,
    {
        toogleDarkMode,
        setLanguage
    },
    {
        theme: themeDark,
        language: 'en',
        menuLanguages: [
            'en', 'fr' , 'he'
        ]
    }
);