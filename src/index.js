import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import Main from './screens/MainScreen'



// redux
import { Provider } from 'react-redux'
// persist redux store
import { PersistGate } from 'redux-persist/integration/react'
import { store , persistor } from './store/reducers';



// router
import { Switch, BrowserRouter, HashRouter } from 'react-router-dom';

// theme provider
import { Provider as ThemeProvider } from './contexts/themeContext';

// store provider
import { Provider as StoreProvider } from './contexts/StoreContext';


const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StoreProvider>
                    <HashRouter>
                        <ThemeProvider>
                            <Main />
                        </ThemeProvider>
                    </HashRouter>
                </StoreProvider>
            </PersistGate>
        </Provider>
    )
};







const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
