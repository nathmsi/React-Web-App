
import {
    ADD_SHOPPING_CART,
    UPADTE_COUNT_SHOPPING_CART,
    DELETE_ALL_SHOPPING_CART,
    DELETE_ONE_SHOPPING_CART,
    ERROR_SHOPPING_CART
} from './types'




export const pushToShoppingCart = (product) => {
    return (dispatch) => {
        dispatch({
            type: ADD_SHOPPING_CART,
            payload: product
        })
    }
};

export const deleteOneShoppingCart = (id) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_ONE_SHOPPING_CART,
            payload: id
        })
    }
};

export const deleteAllShoppingCart = (dispatch) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_ALL_SHOPPING_CART
        })
    }
}

export const updateCountShoppingCart =  (id, count) => {
    return (dispatch) => {
        dispatch({
            type: UPADTE_COUNT_SHOPPING_CART,
            payload: {
                id, count
            }
        })
    }
};




