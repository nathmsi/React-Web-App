import createDataContext from './createDataContext'


const ThemeColorReducer = (state, action) => {
    switch (action.type) {
        case 'set_drawer':
            return { ...state,  open: action.payload.open };
        case 'set_sh':
            return { ...state,  openSH: action.payload.openSH };
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



export const { Context, Provider } = createDataContext(
    ThemeColorReducer,
    {
        setOpen,
        setOpenSH
    },
    {
        open: false,
        openSH: false
    }
);