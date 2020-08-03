
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGIN_OUT
} from '../actions/types'



const INITIAL_STATE = {
    isAuth: null,
    email: '',
    password: '',
    errorMessage: '',
    token: '',
    loading: true,
    user: {
        displayName: '',
        email: '',
        photoURL: ''
    },
    success: false,
};



export default ( state = INITIAL_STATE , action ) => {
    //console.log(action);
    switch (action.type){
        case LOGIN_USER:
            return { ...state , loading: true , errorMessage: '' }
        case LOGIN_USER_SUCCESS:
            return { ...state , user: action.payload.user , token: action.payload.token , errorMessage: '' , success: true  , isAuth: true ,  loading: false }
        case LOGIN_USER_FAIL:
            return { ...state , errorMessage: action.payload , loading: false ,  isAuth: false  }
        case LOGIN_OUT: 
            return { ...state , ...INITIAL_STATE  , user: null , token: '' , isAuth: false}
        default : 
            return state;
    }
}