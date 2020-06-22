import createDataContext from './createDataContext'
import yelp from '../api/yelp';



const storeReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return { ...state, loading: true }
        case 'load_product':
            return { ...state, products: action.payload.products, loading: false, categorieSelected: action.payload.categorieSelected }
        case 'load_menu':
            return { ...state, menu: ['Home', ...action.payload.menu] }
        case 'product_error':
            return { ...state, errorMessage: action.payload, loading: false }
        default: return state;
    }
}




const getProductsHome = (dispatch) => {
    return async (lastID) => {
        try {
            dispatch({ type: 'loading' });
            let path = '/Products/list/pagination/' + (lastID ? lastID : 'none');
            const response = await yelp.get(path);
            console.log(response.data);
            if (response.data) {
                dispatch({
                    type: 'load_product',
                    payload: {
                        products: response.data ? response.data : [],
                        categorieSelected: 'Home'
                    }
                });
            } else {
                dispatch({
                    type: 'product_error',
                    payload: 'problem to load product'
                });
            }
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: 'product_error',
                payload: 'problem to load product'
            });
        }
    };
};

const getMenu = (dispatch) => {
    return async () => {
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
                    type: 'load_menu',
                    payload: {
                        menu: menu ? [].concat.apply([], menu) : [],
                    }
                });
            } else {
                dispatch({
                    type: 'product_error',
                    payload: 'problem to load product'
                });
            }
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: 'product_error',
                payload: 'problem to load product'
            });
        }
    };
};


const getProductsByCategorie = (dispatch) => {
    return async (categorieSelected, lastID) => {
        try {
            dispatch({ type: 'loading' });
            const path = '/products/categorie/' + categorieSelected + '/' + (lastID ? lastID : 'none');
            const response = await yelp.get(path);
            console.log(response.data);
            if (response.data) {
                dispatch({
                    type: 'load_product',
                    payload: {
                        products: response.data ? response.data : [],
                        categorieSelected
                    }
                });
            } else {
                dispatch({
                    type: 'product_error',
                    payload: 'problem to load product'
                });
            }
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: 'product_error',
                payload: 'problem to load product'
            });
        }
    };
};




export const { Context, Provider } = createDataContext(
    storeReducer,
    {
        getProductsHome,
        getMenu,
        getProductsByCategorie,
    },
    {
        shoppingCart: [],
        products: [],
        loading: false,
        categorieSelected: 'Home',
        errorMessage: '',
        menu: [
            'Home'
        ]
    }
);