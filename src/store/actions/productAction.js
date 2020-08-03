import yelp from '../../api/yelp';

import {
    LOAD_NEW_PRODUCTS,
    PRODUCTS_LOADING,
    PRODUCTS_ERROR,
    MENU_CATEGORIES,
    MENU_CATEGORIES_LOADING,
    MENU_CATEGORIES_ERROR
} from './types'




export const getProductsHome = (lastID) => {
    return async (dispatch) => {
        try {
            dispatch({ type: PRODUCTS_LOADING , payload: { categorieSelected: 'Home' }  });
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

export const getMenu = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: MENU_CATEGORIES_LOADING });
            let path = '/menu';
            const response = await yelp.get(path);
            if (response.data) {
                const menu = response.data.map(
                    el => el.value
                )
                dispatch({
                    type: MENU_CATEGORIES,
                    payload: {
                        menu: menu ? [].concat.apply([], menu) : [],
                        menuCategorie : response.data
                    }
                });
            } else {
                dispatch({
                    type: MENU_CATEGORIES_ERROR,
                    payload: 'problem to load product'
                });
            }
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: MENU_CATEGORIES_ERROR,
                payload: 'problem to load product'
            });
        }
    };
};


export const getProductsByCategorie = (categorieSelected, lastID) => {
    return async (dispatch) => {
        try {
            dispatch({ type: PRODUCTS_LOADING , payload: { categorieSelected }  });
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