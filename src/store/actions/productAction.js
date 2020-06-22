import yelp from '../../api/yelp';

import {
    LOAD_NEW_PRODUCTS,
    PRODUCTS_LOADING,
    PRODUCTS_ERROR,
    MENU_CATEGORIES
} from './types'




export const getProductsHome = (lastID) => {
    return async (dispatch) => {
        try {
            dispatch({ type: PRODUCTS_LOADING });
            let path = '/Products/list/pagination/' + (lastID ? lastID : 'none');
            const response = await yelp.get(path);
            console.log(response.data);
            if (response.data) {
                dispatch({
                    type: LOAD_NEW_PRODUCTS,
                    payload: {
                        products: response.data ? response.data : [],
                        categorieSelected: 'Home'
                    }
                });
            } else {
                dispatch({
                    type: PRODUCTS_ERROR,
                    payload: 'problem to load product'
                });
            }
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: PRODUCTS_ERROR,
                payload: 'problem to load product'
            });
        }
    };
};

export const getMenu = (dispatch) => {
    return async (dispatch) => {
        try {
            //dispatch({ type: 'loading' });
            let path = '/menu';
            const response = await yelp.get(path);
            console.log(response.data);
            if (response.data) {
                const menu = response.data.map(
                    el => el.value
                )
                //console.log(menu);
                dispatch({
                    type: MENU_CATEGORIES,
                    payload: {
                        menu: menu ? [].concat.apply([], menu) : [],
                    }
                });
            } else {
                dispatch({
                    type: PRODUCTS_ERROR,
                    payload: 'problem to load product'
                });
            }
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: PRODUCTS_ERROR,
                payload: 'problem to load product'
            });
        }
    };
};


export const getProductsByCategorie = (categorieSelected, lastID) => {
    return async (dispatch) => {
        try {
            dispatch({ type: PRODUCTS_LOADING });
            const path = '/products/categorie/' + categorieSelected + '/' + (lastID ? lastID : 'none');
            const response = await yelp.get(path);
            console.log(response.data);
            if (response.data) {
                dispatch({
                    type: LOAD_NEW_PRODUCTS,
                    payload: {
                        products: response.data ? response.data : [],
                        categorieSelected
                    }
                });
            } else {
                dispatch({
                    type: PRODUCTS_ERROR,
                    payload: 'problem to load product'
                });
            }
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: PRODUCTS_ERROR,
                payload: 'problem to load product'
            });
        }
    };
};