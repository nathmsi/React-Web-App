
import {
    ADD_SHOPPING_CART,
    UPADTE_COUNT_SHOPPING_CART,
    DELETE_ALL_SHOPPING_CART,
    DELETE_ONE_SHOPPING_CART,
    ERROR_SHOPPING_CART
} from '../actions/types';



const INITIAL_STATE = {
    shoppingCart: [],
    loading: false,
    errorMessage: '',
};
 


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SHOPPING_CART:
            const currentProduct = state.shoppingCart.find(el => el.id === action.payload.id);
            if (currentProduct) {
                const productsSH = state.shoppingCart.map(el => el);
                productsSH.forEach(el => {
                    if (el.id === currentProduct.id) {
                        el.count = currentProduct.count + 1;
                    }
                })
                return { ...state, shoppingCart: [...productsSH] }
            } else {
                action.payload.count = 1;
                return { ...state, shoppingCart: [...state.shoppingCart, action.payload] }
            }
        case UPADTE_COUNT_SHOPPING_CART:
            const productsSH = state.shoppingCart.map(el => el);
            productsSH.forEach(el => {
                if (el.id === action.payload.id) {
                    if (action.payload.count > -1 ) {
                        el.count = action.payload.count;
                    }else{
                        el.count = 0;
                    }
                }
            })
            return { ...state, shoppingCart: [...productsSH] }
        case DELETE_ONE_SHOPPING_CART:
            return { ...state, shoppingCart: state.shoppingCart.filter(el => el.id !== action.payload) }
        case DELETE_ALL_SHOPPING_CART:
            return { ...state, shoppingCart: [] }
        case ERROR_SHOPPING_CART:
            return { ...state }
        default:
            return state;
    }
}



