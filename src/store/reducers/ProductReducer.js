
import {
    LOAD_NEW_PRODUCTS,
    PRODUCTS_LOADING,
    PRODUCTS_ERROR,
    MENU_CATEGORIES,
} from '../actions/types'



const INITIAL_STATE = {
    products: [],
    loading: false,
    categorieSelected: 'Home',
    errorMessage: '',
    menu: [
        'Home'
    ]
};



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCTS_LOADING:
            return { ...state, loading: true , errorMessage: '' , products: [] }
        case LOAD_NEW_PRODUCTS:
            return { ...state, products: action.payload.products, loading: false, categorieSelected: action.payload.categorieSelected }
        case MENU_CATEGORIES:
            return { ...state, menu: ['Home', ...action.payload.menu] }
        case PRODUCTS_ERROR:
            return { ...state, errorMessage: action.payload, loading: false }
        default:
            return state;
    }
}



