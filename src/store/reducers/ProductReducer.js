
import {
    LOAD_NEW_PRODUCTS,
    PRODUCTS_LOADING,
    PRODUCTS_ERROR,
    MENU_CATEGORIES,
    MENU_CATEGORIES_LOADING,
    MENU_CATEGORIES_ERROR
} from '../actions/types'



const INITIAL_STATE = {
    products: [],
    loading: false,
    categorieSelected: 'Home',
    errorMessage: '',
    menu: [
        'Home'
    ],
    menuCategorie: [],
    loadingMenu: false
};



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCTS_LOADING:
            return { ...state, loading: true, errorMessage: '', products: [] }
        case MENU_CATEGORIES_LOADING:
            return { ...state, loadingMenu: true }
        case LOAD_NEW_PRODUCTS:
            return {
                ...state, products: action.payload.products, loading: false,
                categorieSelected: action.payload.categorieSelected
            }
        case MENU_CATEGORIES:
            return {
                ...state, menu: ['Home', ...action.payload.menu], menuCategorie: action.payload.menuCategorie
                , loadingMenu: false
            }
        case PRODUCTS_ERROR:
            return { ...state, errorMessage: action.payload, loading: false }
        case MENU_CATEGORIES_ERROR:
            return { ...state, loadingMenu: false, errorMenu: action.payload }
        default:
            return state;
    }
}



