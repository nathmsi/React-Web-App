import React from "react";
import NavLinkOption from './navLink';

import MainStore from '../store/MainStore';
import AboutScreen from '../../screens/AboutScreen';
import ContactMeScreen from '../../screens/ContactMeScreen';
import LoginUserScreen from '../../screens/LoginUserScreen';
import HomeScreen from '../../screens/HomeScreen';

import { Switch, Route } from 'react-router-dom';


const MainRoute = () => {
    return (
        <Switch>
            <Route exact path='/store/home' component={MainStore} />
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/about' component={AboutScreen} />
            <Route exact path='/contact' component={ContactMeScreen} />
            <Route exact path='/signIn' component={LoginUserScreen} />
            <Route component={NotFound} />
        </Switch>
    );
}

const NotFound = () => (
    <div style={{ marginTop: 70 }}>
    <h1>404.. This page is not found!</h1>
    </div>
);




export {
    MainRoute,
    NavLinkOption
}