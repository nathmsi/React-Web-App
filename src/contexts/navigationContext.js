import createDataContext from './createDataContext'


const ThemeColorReducer = (state, action) => {
    switch (action.type) {
        case 'set_drawer':
            return { ...state,  open: action.payload.open };
        case 'set_sh':
            return { ...state,  openSH: action.payload.openSH };
        case 'set_user':
            return { ...state,  openUser: action.payload.open };
        case 'set_colapse_menu':
            return { ...state,  openCollspseMenu: action.payload.open };
        default: return state;
    }
}



const setOpen = (dispatch) => {
    return async (open) => {
        dispatch({
            type: 'set_drawer', payload: { open }
        });
    }
};

const setOpenSH = (dispatch) => {
    return async (openSH) => {
        dispatch({
            type: 'set_sh', payload: { openSH }
        });
    }
};


const setOpenUser = (dispatch) => {
    return async (open) => {
        dispatch({
            type: 'set_user', payload: { open }
        });
    }
};

const setOpenCollspseMenu = (dispatch) => {
    return async (open) => {
        dispatch({
            type: 'set_colapse_menu', payload: { open }
        });
    }
};

export const { Context, Provider } = createDataContext(
    ThemeColorReducer,
    {
        setOpen,
        setOpenSH,
        setOpenUser,
        setOpenCollspseMenu
    },
    {
        open: false,
        openSH: false,
        openUser: false,
        openCollspseMenu: true
    }
);