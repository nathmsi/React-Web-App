// redux
import { combineReducers, applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import { interceptorsAxios } from '../../api/yelp'

// persist redux store
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// reducers
import AuthReducer from './AuthReducer'
import ProductReducer from './ProductReducer'
import ShoppingCartReducer from './ShoppingCartReducer'


const reducers = combineReducers({
    auth: AuthReducer,
    product: ProductReducer,
    shoppingCart: ShoppingCartReducer
})


const rootPersistConfig = {
    key: 'persist-data',
    storage: storage,
    blacklist: ['auth'],
}


const pReducer = persistReducer(rootPersistConfig, reducers);

const store = createStore(pReducer, {}, applyMiddleware(ReduxThunk, interceptorsAxios));
const persistor = persistStore(store);


export {
    persistor,
    store
}