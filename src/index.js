import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";

// translation
import './translation/i18n';

// main app
import Main from './screens/MainScreen'

// redux
import { Provider } from 'react-redux'

// persist redux store
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/reducers';

// router
import { HashRouter } from 'react-router-dom';

// theme provider
import { Provider as ThemeProvider } from './contexts/themeContext';



const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <ThemeProvider>
                            <Main />
                    </ThemeProvider>
                </HashRouter>
            </PersistGate>
        </Provider>
    )
};







const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;


export default App;