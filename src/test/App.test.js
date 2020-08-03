import React from 'react'
import { shallow } from 'enzyme'

import ContactMeScreen from '../screens/ContactMeScreen';
import AboutScreen from '../screens/AboutScreen';
import MainScreen from '../screens/MainScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginUserScreen from '../screens/LoginUserScreen';
import StoreScreen from '../screens/StoreScreen';


import ShoppingCart from '../components/Header/DrawerShoppingCart';


// redux
import { Provider } from 'react-redux'

// persist redux store
import { PersistGate } from 'redux-persist/integration/react'
import { store , persistor } from '../store/reducers';

// router
import { HashRouter } from 'react-router-dom';

// theme provider
import { Provider as ThemeProvider } from '../contexts/themeContext';



const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                    <HashRouter>
                        <ThemeProvider>
                            <ShoppingCart />
                        </ThemeProvider>
                    </HashRouter>
            </PersistGate>
        </Provider>
    )
};




describe('App', () => {
  test('should render', () => {
    const wrapper = shallow(
      <App />
    )
    expect(wrapper.exists()).toBeTruthy()
  })
})